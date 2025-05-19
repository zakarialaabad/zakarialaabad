
import { useState,ReactNode } from "react"
import { Save, RefreshCw, Globe, Bell, Shield, CreditCard, Percent, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { motion } from "framer-motion"
import AdminLayout from "@/layouts/layoutAdmin"
 function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">Gérez les paramètres de la plateforme E-JAR</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <RefreshCw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
          <Button size="sm" className="bg-[#465baa] hover:bg-[#465baa]/90" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Enregistrer les modifications
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 h-auto">
          <TabsTrigger value="general" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Général</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Sécurité</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Paiements</span>
          </TabsTrigger>
          <TabsTrigger value="fees" className="flex items-center">
            <Percent className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Frais</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Utilisateurs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Paramètres généraux</CardTitle>
                <CardDescription>Configurez les paramètres généraux de la plateforme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Nom du site</Label>
                    <Input id="site-name" defaultValue="E-JAR" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-description">Description du site</Label>
                    <Textarea
                      id="site-description"
                      defaultValue="Plateforme de location immobilière au Maroc"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email de contact</Label>
                    <Input id="contact-email" defaultValue="contact@e-jar.ma" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Téléphone de contact</Label>
                    <Input id="contact-phone" defaultValue="+212 5 22 12 34 56" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="default-language">Langue par défaut</Label>
                    <Select defaultValue="fr">
                      <SelectTrigger id="default-language">
                        <SelectValue placeholder="Sélectionner une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="ar">Arabe</SelectItem>
                        <SelectItem value="en">Anglais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuseau horaire</Label>
                    <Select defaultValue="africa-casablanca">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Sélectionner un fuseau horaire" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="africa-casablanca">Africa/Casablanca (GMT+1)</SelectItem>
                        <SelectItem value="europe-paris">Europe/Paris (GMT+2)</SelectItem>
                        <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Maintenance</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                      <p className="text-sm text-gray-500">Activer le mode maintenance pour empêcher l'accès au site</p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="debug-mode">Mode débogage</Label>
                      <p className="text-sm text-gray-500">
                        Activer le mode débogage pour afficher les erreurs détaillées
                      </p>
                    </div>
                    <Switch id="debug-mode" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de notifications</CardTitle>
                <CardDescription>Configurez les notifications envoyées aux utilisateurs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications par email</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-new-booking">Nouvelles réservations</Label>
                      <p className="text-sm text-gray-500">Envoyer un email lors d'une nouvelle réservation</p>
                    </div>
                    <Switch id="email-new-booking" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-booking-confirmation">Confirmation de réservation</Label>
                      <p className="text-sm text-gray-500">Envoyer un email de confirmation de réservation</p>
                    </div>
                    <Switch id="email-booking-confirmation" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-payment-confirmation">Confirmation de paiement</Label>
                      <p className="text-sm text-gray-500">Envoyer un email de confirmation de paiement</p>
                    </div>
                    <Switch id="email-payment-confirmation" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-new-message">Nouveaux messages</Label>
                      <p className="text-sm text-gray-500">Envoyer un email lors d'un nouveau message</p>
                    </div>
                    <Switch id="email-new-message" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications système</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-new-property">Nouvelles propriétés</Label>
                      <p className="text-sm text-gray-500">Notifier les administrateurs des nouvelles propriétés</p>
                    </div>
                    <Switch id="system-new-property" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-new-user">Nouveaux utilisateurs</Label>
                      <p className="text-sm text-gray-500">Notifier les administrateurs des nouveaux utilisateurs</p>
                    </div>
                    <Switch id="system-new-user" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-payment-issue">Problèmes de paiement</Label>
                      <p className="text-sm text-gray-500">Notifier les administrateurs des problèmes de paiement</p>
                    </div>
                    <Switch id="system-payment-issue" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de sécurité</CardTitle>
                <CardDescription>Configurez les paramètres de sécurité de la plateforme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentification</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor-auth">Authentification à deux facteurs</Label>
                      <p className="text-sm text-gray-500">
                        Exiger l'authentification à deux facteurs pour les administrateurs
                      </p>
                    </div>
                    <Switch id="two-factor-auth" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="social-login">Connexion via réseaux sociaux</Label>
                      <p className="text-sm text-gray-500">Permettre la connexion via Google, Facebook, etc.</p>
                    </div>
                    <Switch id="social-login" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Expiration de session (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" min="5" max="1440" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Protection des données</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-encryption">Chiffrement des données</Label>
                      <p className="text-sm text-gray-500">Activer le chiffrement des données sensibles</p>
                    </div>
                    <Switch id="data-encryption" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ip-logging">Journalisation des adresses IP</Label>
                      <p className="text-sm text-gray-500">Enregistrer les adresses IP des utilisateurs</p>
                    </div>
                    <Switch id="ip-logging" defaultChecked />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Conservation des données (jours)</Label>
                    <Input id="data-retention" type="number" defaultValue="365" min="30" max="3650" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de paiement</CardTitle>
                <CardDescription>Configurez les options de paiement de la plateforme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Méthodes de paiement</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-card">Cartes bancaires</Label>
                      <p className="text-sm text-gray-500">Accepter les paiements par carte bancaire</p>
                    </div>
                    <Switch id="payment-card" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-bank">Virements bancaires</Label>
                      <p className="text-sm text-gray-500">Accepter les paiements par virement bancaire</p>
                    </div>
                    <Switch id="payment-bank" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payment-mobile">Paiements mobiles</Label>
                      <p className="text-sm text-gray-500">Accepter les paiements via applications mobiles</p>
                    </div>
                    <Switch id="payment-mobile" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Configuration des paiements</h3>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise par défaut</Label>
                    <Select defaultValue="mad">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Sélectionner une devise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mad">Dirham marocain (MAD)</SelectItem>
                        <SelectItem value="eur">Euro (EUR)</SelectItem>
                        <SelectItem value="usd">Dollar américain (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-gateway">Passerelle de paiement</Label>
                    <Select defaultValue="cmi">
                      <SelectTrigger id="payment-gateway">
                        <SelectValue placeholder="Sélectionner une passerelle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cmi">CMI (Centre Monétique Interbancaire)</SelectItem>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit-percentage">Pourcentage d'acompte (%)</Label>
                    <Input id="deposit-percentage" type="number" defaultValue="30" min="0" max="100" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="fees" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Paramètres des frais</CardTitle>
                <CardDescription>Configurez les frais appliqués sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Frais de service</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="host-fee">Frais pour les propriétaires (%)</Label>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <Slider id="host-fee" defaultValue={[5]} max={20} step={0.5} className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="guest-fee">Frais pour les locataires (%)</Label>
                      <span className="text-sm font-medium">3%</span>
                    </div>
                    <Slider id="guest-fee" defaultValue={[3]} max={15} step={0.5} className="w-full" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Frais de transaction</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="payment-processing-fee">Frais de traitement de paiement (%)</Label>
                      <span className="text-sm font-medium">1.5%</span>
                    </div>
                    <Slider id="payment-processing-fee" defaultValue={[1.5]} max={5} step={0.1} className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fixed-fee">Frais fixe par transaction (MAD)</Label>
                    <Input id="fixed-fee" type="number" defaultValue="5" min="0" max="50" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Frais spéciaux</h3>
                  <div className="space-y-2">
                    <Label htmlFor="featured-listing-fee">Frais pour annonce en vedette (MAD)</Label>
                    <Input id="featured-listing-fee" type="number" defaultValue="200" min="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="premium-listing-fee">Frais pour annonce premium (MAD)</Label>
                    <Input id="premium-listing-fee" type="number" defaultValue="500" min="0" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Paramètres des utilisateurs</CardTitle>
                <CardDescription>Configurez les paramètres liés aux utilisateurs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Inscription et vérification</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-verification">Vérification par email</Label>
                      <p className="text-sm text-gray-500">Exiger la vérification de l'email lors de l'inscription</p>
                    </div>
                    <Switch id="email-verification" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="phone-verification">Vérification par téléphone</Label>
                      <p className="text-sm text-gray-500">Exiger la vérification du numéro de téléphone</p>
                    </div>
                    <Switch id="phone-verification" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="id-verification">Vérification d'identité</Label>
                      <p className="text-sm text-gray-500">Exiger la vérification d'identité pour les propriétaires</p>
                    </div>
                    <Switch id="id-verification" defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Limites et restrictions</h3>
                  <div className="space-y-2">
                    <Label htmlFor="max-properties">Nombre maximum de propriétés par utilisateur</Label>
                    <Input id="max-properties" type="number" defaultValue="20" min="1" max="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-bookings">Nombre maximum de réservations simultanées</Label>
                    <Input id="max-bookings" type="number" defaultValue="5" min="1" max="20" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-approve-users">Approbation automatique des utilisateurs</Label>
                      <p className="text-sm text-gray-500">Approuver automatiquement les nouveaux utilisateurs</p>
                    </div>
                    <Switch id="auto-approve-users" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
AdminSettings.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default AdminSettings;