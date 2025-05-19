"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthAlert } from "@/components/auth/auth-alert"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { MessageList } from "@/components/messages/message-list"
import { MessageDetail } from "@/components/messages/message-detail"
import { EmptyState } from "@/components/messages/empty-state"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { type Conversation, type Message, demoConversations } from "@/data/messages"

export default function MessagesPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileDetail, setShowMobileDetail] = useState(false)
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "archived">("all")

  // Charger les conversations
  useEffect(() => {
    // Simuler un chargement depuis une API
    setConversations(demoConversations)
  }, [])

  // Filtrer les conversations
  const filteredConversations = conversations.filter((conversation) => {
    // Filtrer par recherche
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        conversation.participant.name.toLowerCase().includes(query) ||
        conversation.property.title.toLowerCase().includes(query) ||
        conversation.lastMessage.content.toLowerCase().includes(query)
      )
    }

    // Filtrer par statut
    if (activeFilter === "unread") {
      return conversation.unreadCount > 0
    }

    if (activeFilter === "archived") {
      return conversation.archived
    }

    return true
  })

  // Gérer la sélection d'une conversation
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    setShowMobileDetail(true)

    // Marquer comme lu
    if (conversation.unreadCount > 0) {
      setConversations((prevConversations) =>
        prevConversations.map((c) => {
          if (c.id === conversation.id) {
            return { ...c, unreadCount: 0 }
          }
          return c
        }),
      )
    }
  }

  // Envoyer un nouveau message
  const handleSendMessage = (content: string) => {
    if (!selectedConversation || !content.trim()) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || "current-user",
      content,
      timestamp: new Date(),
      status: "sent",
    }

    // Mettre à jour la conversation sélectionnée
    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
      lastMessage: newMessage,
    }

    setSelectedConversation(updatedConversation)

    // Mettre à jour la liste des conversations
    setConversations((prevConversations) =>
      prevConversations.map((c) => (c.id === updatedConversation.id ? updatedConversation : c)),
    )
  }

  // Archiver une conversation
  const handleArchiveConversation = (conversationId: string) => {
    setConversations((prevConversations) =>
      prevConversations.map((c) => {
        if (c.id === conversationId) {
          return { ...c, archived: !c.archived }
        }
        return c
      }),
    )

    if (selectedConversation?.id === conversationId) {
      setSelectedConversation((prev) => (prev ? { ...prev, archived: !prev.archived } : null))
    }
  }

  // Retour à la liste sur mobile
  const handleBackToList = () => {
    setShowMobileDetail(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 container mx-auto px-4 py-16">
          <AuthAlert
            title="Connexion requise"
            description="Vous devez être connecté pour accéder à vos messages."
            buttonText="Se connecter"
            onButtonClick={() => router.push("/")}
          />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <DashboardNav activeItem="messages" />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-16rem)]">
          <div className="flex h-full">
            {/* Liste des conversations (masquée sur mobile quand une conversation est ouverte) */}
            <div
              className={`w-full md:w-1/3 border-r border-gray-200 flex flex-col ${
                showMobileDetail ? "hidden md:flex" : "flex"
              }`}
            >
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold mb-4">Messages</h2>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher dans les messages..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant={activeFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter("all")}
                    className={activeFilter === "all" ? "bg-primary hover:bg-primary/90" : ""}
                  >
                    Tous
                  </Button>
                  <Button
                    variant={activeFilter === "unread" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter("unread")}
                    className={activeFilter === "unread" ? "bg-primary hover:bg-primary/90" : ""}
                  >
                    Non lus
                  </Button>
                  <Button
                    variant={activeFilter === "archived" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter("archived")}
                    className={activeFilter === "archived" ? "bg-primary hover:bg-primary/90" : ""}
                  >
                    Archivés
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length > 0 ? (
                  <MessageList
                    conversations={filteredConversations}
                    selectedId={selectedConversation?.id}
                    onSelect={handleSelectConversation}
                  />
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {searchQuery
                      ? "Aucune conversation ne correspond à votre recherche."
                      : activeFilter === "unread"
                        ? "Vous n'avez pas de messages non lus."
                        : activeFilter === "archived"
                          ? "Vous n'avez pas de conversations archivées."
                          : "Vous n'avez pas encore de conversations."}
                  </div>
                )}
              </div>
            </div>

            {/* Détail de la conversation (affiché conditionnellement sur mobile) */}
            <div className={`w-full md:w-2/3 flex flex-col ${showMobileDetail ? "flex" : "hidden md:flex"}`}>
              {selectedConversation ? (
                <MessageDetail
                  conversation={selectedConversation}
                  onSendMessage={handleSendMessage}
                  onArchive={() => handleArchiveConversation(selectedConversation.id)}
                  onBack={handleBackToList}
                  currentUserId={user?.id || "current-user"}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
