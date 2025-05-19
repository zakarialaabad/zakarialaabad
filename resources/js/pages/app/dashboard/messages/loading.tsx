import { Skeleton } from "@/components/ui/skeleton"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function MessagesLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <DashboardNav activeItem="messages" />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-16rem)]">
          <div className="flex h-full">
            {/* Liste des conversations */}
            <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <Skeleton className="h-8 w-32 mb-4" />
                <Skeleton className="h-10 w-full mb-4" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="p-4 border-b border-gray-200">
                    <div className="flex items-start">
                      <Skeleton className="h-12 w-12 rounded-full mr-3" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <Skeleton className="h-4 w-24 mb-2" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <Skeleton className="h-3 w-32 mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <div className="flex justify-between">
                          <Skeleton className="h-5 w-20" />
                          <Skeleton className="h-5 w-5 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Détail de la conversation */}
            <div className="hidden md:flex md:w-2/3 flex-col">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>

              <div className="p-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-md mr-3" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-48 mb-1" />
                    <Skeleton className="h-3 w-64" />
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {Array.from({ length: 3 }).map((_, groupIndex) => (
                  <div key={groupIndex} className="mb-6">
                    <div className="flex justify-center my-4">
                      <Skeleton className="h-5 w-24 rounded-full" />
                    </div>

                    {Array.from({ length: 2 }).map((_, msgIndex) => (
                      <div
                        key={`${groupIndex}-${msgIndex}`}
                        className={`flex ${msgIndex % 2 === 0 ? "justify-start" : "justify-end"} mb-2`}
                      >
                        {msgIndex % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full mr-2" />}
                        <Skeleton className={`h-20 ${msgIndex % 2 === 0 ? "w-64 rounded-lg" : "w-56 rounded-lg"}`} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="flex items-end">
                  <Skeleton className="flex-1 h-20 rounded-md" />
                  <Skeleton className="ml-2 h-10 w-10 rounded-full" />
                </div>
                <div className="flex justify-between mt-2">
                  <Skeleton className="h-3 w-64" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
