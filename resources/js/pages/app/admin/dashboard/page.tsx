import type React from "react";
import { useState,ReactNode } from "react";
import {
  BarChart3,
  Building,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MessageSquare,
  UserPlus,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import AdminLayout from "../layout";
 function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue dans le panneau d'administration E-JAR</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Créer un élément HTML qui sera converti en PDF
              const reportContent = document.createElement("div");
              reportContent.innerHTML = `
<html>
  <head>
    <title>Rapport E-JAR</title>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style>
      body { font-family: Arial, sans-serif; margin: 40px; }
      h1 { color: #2563eb; text-align: center; }
      .header { text-align: center; margin-bottom: 30px; }
      .logo { text-align: center; margin-bottom: 20px; }
      .date { text-align: right; margin-bottom: 30px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
      th { background-color: #f3f4f6; text-align: left; padding: 10px; }
      td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
      .section { margin-top: 30px; margin-bottom: 15px; color: #2563eb; }
      .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #6b7280; }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="logo">E-JAR RAPPORT</div>
      <h1>Rapport du Tableau de Bord</h1>
    </div>

    <div class="date">Date: ${new Date().toLocaleDateString()}</div>

    <h2 class="section">Résumé</h2>
    <table>
      <tr>
        <th>Catégorie</th>
        <th>Total</th>
        <th>Évolution</th>
      </tr>
      <tr>
        <td>Propriétés</td>
        <td>1,284</td>
        <td>+12% depuis le mois dernier</td>
      </tr>
      <tr>
        <td>Utilisateurs actifs</td>
        <td>8,549</td>
        <td>+25.8% depuis le mois dernier</td>
      </tr>
      <tr>
        <td>Réservations</td>
        <td>573</td>
        <td>+4.3% depuis le mois dernier</td>
      </tr>
      <tr>
        <td>Revenus</td>
        <td>1.2M MAD</td>
        <td>-2.5% depuis le mois dernier</td>
      </tr>
    </table>

    <h2 class="section">Détails des Propriétés</h2>
    <table>
      <tr>
        <th>Statut</th>
        <th>Nombre</th>
        <th>Pourcentage</th>
      </tr>
      <tr>
        <td>Validées</td>
        <td>842</td>
        <td>65.6%</td>
      </tr>
      <tr>
        <td>En attente</td>
        <td>156</td>
        <td>12.1%</td>
      </tr>
      <tr>
        <td>Refusées</td>
        <td>68</td>
        <td>5.3%</td>
      </tr>
      <tr>
        <td>Signalées</td>
        <td>42</td>
        <td>3.3%</td>
      </tr>
      <tr>
        <td>Expirées</td>
        <td>176</td>
        <td>13.7%</td>
      </tr>
    </table>

    <h2 class="section">Types de Propriétés</h2>
    <table>
      <tr>
        <th>Type</th>
        <th>Nombre</th>
        <th>Pourcentage</th>
      </tr>
      <tr>
        <td>Appartement</td>
        <td>486</td>
        <td>37.8%</td>
      </tr>
      <tr>
        <td>Maison</td>
        <td>312</td>
        <td>24.3%</td>
      </tr>
      <tr>
        <td>Riad</td>
        <td>198</td>
        <td>15.4%</td>
      </tr>
      <tr>
        <td>Villa</td>
        <td>156</td>
        <td>12.1%</td>
      </tr>
      <tr>
        <td>Studio</td>
        <td>132</td>
        <td>10.3%</td>
      </tr>
    </table>

    <h2 class="section">Villes Populaires</h2>
    <table>
      <tr>
        <th>Ville</th>
        <th>Nombre</th>
        <th>Pourcentage</th>
      </tr>
      <tr>
        <td>Casablanca</td>
        <td>342</td>
        <td>26.6%</td>
      </tr>
      <tr>
        <td>Marrakech</td>
        <td>286</td>
        <td>22.3%</td>
      </tr>
      <tr>
        <td>Rabat</td>
        <td>198</td>
        <td>15.4%</td>
      </tr>
      <tr>
        <td>Agadir</td>
        <td>156</td>
        <td>12.1%</td>
      </tr>
      <tr>
        <td>Fès</td>
        <td>132</td>
        <td>10.3%</td>
      </tr>
    </table>

    <div class="footer">
      <p>Ce rapport a été généré automatiquement par le système d'administration E-JAR.</p>
      <p>© ${new Date().getFullYear()} E-JAR. Tous droits réservés.</p>
    </div>
  </body>
</html>
`;

              // Créer un Blob avec le contenu HTML en spécifiant explicitement l'encodage UTF-8
              const blob = new Blob([reportContent.innerHTML], { type: "text/html;charset=utf-8" });

              // Créer un URL pour le Blob
              const url = URL.createObjectURL(blob);

              // Ouvrir le contenu dans une nouvelle fenêtre pour impression en PDF
              const printWindow = window.open(url, "_blank");

              if (printWindow) {
                printWindow.onload = () => {
                  // S'assurer que le document est en UTF-8
                  const doc = printWindow.document;

                  // Ajouter des méta-tags pour l'encodage si nécessaire
                  if (!doc.querySelector('meta[charset="UTF-8"]')) {
                    const meta = doc.createElement("meta");
                    meta.setAttribute("charset", "UTF-8");
                    doc.head.appendChild(meta);
                  }

                  // Ajouter un message d'instruction
                  const instructionDiv = doc.createElement("div");
                  instructionDiv.style.position = "fixed";
                  instructionDiv.style.top = "0";
                  instructionDiv.style.left = "0";
                  instructionDiv.style.right = "0";
                  instructionDiv.style.padding = "10px";
                  instructionDiv.style.backgroundColor = "#f0f9ff";
                  instructionDiv.style.borderBottom = "1px solid #bae6fd";
                  instructionDiv.style.textAlign = "center";
                  instructionDiv.style.zIndex = "9999";
                  instructionDiv.innerHTML =
                    'Pour enregistrer en PDF, utilisez la fonction "Imprimer" de votre navigateur (Ctrl+P ou Cmd+P) puis sélectionnez "Enregistrer en PDF"';
                  doc.body.insertBefore(instructionDiv, doc.body.firstChild);

                  // Déclencher automatiquement la boîte de dialogue d'impression après un court délai
                  setTimeout(() => {
                    printWindow.print();
                  }, 1000);
                };
              } else {
                // Fallback si la fenêtre ne s'ouvre pas
                alert(
                  "Impossible d'ouvrir la fenêtre d'impression. Veuillez vérifier les paramètres de votre navigateur.",
                );
              }
            }}
          >
            Télécharger le rapport
          </Button>
          <Button
            size="sm"
            className="bg-[#465baa] hover:bg-[#465baa]/90"
            onClick={(event) => {
              // Show loading state
              const originalText = "Actualiser les données";
              const button = event.currentTarget;
              if (button) {
                button.disabled = true;
                button.innerText = "Actualisation...";

                // Simulate data refresh with timeout
                setTimeout(() => {
                  // Reset button state
                  button.disabled = false;
                  button.innerText = originalText;

                  // Show success notification
                  alert("Les données ont été actualisées avec succès!");

                  // You could also update state variables here to refresh the actual data
                  // For example: setActiveTab("overview") to trigger a re-render
                  setActiveTab(activeTab);
                }, 1500);
              }
            }}
          >
            Actualiser les données
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Propriétés totales"
              value="1,284"
              description="+12% depuis le mois dernier"
              trend="up"
              icon={<Building className="h-5 w-5" />}
              color="blue"
            />
            <StatsCard
              title="Utilisateurs actifs"
              value="8,549"
              description="+25.8% depuis le mois dernier"
              trend="up"
              icon={<Users className="h-5 w-5" />}
              color="green"
            />
            <StatsCard
              title="Réservations"
              value="573"
              description="+4.3% depuis le mois dernier"
              trend="up"
              icon={<Calendar className="h-5 w-5" />}
              color="amber"
            />
            <StatsCard
              title="Revenus"
              value="1.2M MAD"
              description="-2.5% depuis le mois dernier"
              trend="down"
              icon={<DollarSign className="h-5 w-5" />}
              color="rose"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Aperçu des activités</CardTitle>
                <CardDescription>Activités récentes sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ActivityItem
                    icon={<UserPlus className="h-4 w-4" />}
                    title="Nouvel utilisateur inscrit"
                    description="Ahmed Benjelloun s'est inscrit en tant que propriétaire"
                    time="Il y a 5 minutes"
                    iconColor="bg-green-100 text-green-700"
                  />
                  <ActivityItem
                    icon={<Building className="h-4 w-4" />}
                    title="Nouvelle propriété ajoutée"
                    description="Appartement moderne à Casablanca a été ajouté"
                    time="Il y a 15 minutes"
                    iconColor="bg-blue-100 text-blue-700"
                  />
                  <ActivityItem
                    icon={<Calendar className="h-4 w-4" />}
                    title="Nouvelle réservation"
                    description="Réservation #12458 confirmée pour Riad à Marrakech"
                    time="Il y a 32 minutes"
                    iconColor="bg-amber-100 text-amber-700"
                  />
                  <ActivityItem
                    icon={<CheckCircle className="h-4 w-4" />}
                    title="Propriété validée"
                    description="Villa avec piscine à Agadir a été validée"
                    time="Il y a 1 heure"
                    iconColor="bg-green-100 text-green-700"
                  />
                  <ActivityItem
                    icon={<MessageSquare className="h-4 w-4" />}
                    title="Nouveau message"
                    description="5 nouveaux messages nécessitent une attention"
                    time="Il y a 2 heures"
                    iconColor="bg-purple-100 text-purple-700"
                  />
                </div>
                <Button variant="ghost" className="mt-4 w-full" size="sm">
                  Voir toutes les activités
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Propriétés en attente</CardTitle>
                <CardDescription>Propriétés nécessitant une validation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PendingPropertyItem
                    title="Appartement vue sur mer"
                    location="Tanger, Maroc"
                    owner="Karim Alami"
                    time="Il y a 2 heures"
                    image="/moroccan-ocean-balcony.png"
                  />
                  <PendingPropertyItem
                    title="Riad traditionnel"
                    location="Marrakech, Maroc"
                    owner="Fatima Zahra"
                    time="Il y a 5 heures"
                    image="/riad-courtyard-oasis.png"
                  />
                  <PendingPropertyItem
                    title="Studio moderne"
                    location="Casablanca, Maroc"
                    owner="Youssef Benjelloun"
                    time="Il y a 8 heures"
                    image="/warm-moroccan-retreat.png"
                  />
                </div>
                <Button variant="ghost" className="mt-4 w-full" size="sm">
                  Voir toutes les propriétés en attente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Statut des propriétés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <StatusItem
                    label="Validées"
                    value={842}
                    percentage={65.6}
                    icon={<CheckCircle className="h-4 w-4" />}
                    color="bg-green-100 text-green-700"
                  />
                  <StatusItem
                    label="En attente"
                    value={156}
                    percentage={12.1}
                    icon={<Clock className="h-4 w-4" />}
                    color="bg-amber-100 text-amber-700"
                  />
                  <StatusItem
                    label="Refusées"
                    value={68}
                    percentage={5.3}
                    icon={<XCircle className="h-4 w-4" />}
                    color="bg-red-100 text-red-700"
                  />
                  <StatusItem
                    label="Signalées"
                    value={42}
                    percentage={3.3}
                    icon={<AlertTriangle className="h-4 w-4" />}
                    color="bg-orange-100 text-orange-700"
                  />
                  <StatusItem
                    label="Expirées"
                    value={176}
                    percentage={13.7}
                    icon={<Calendar className="h-4 w-4" />}
                    color="bg-purple-100 text-purple-700"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Types de propriétés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <PropertyTypeItem
                    type="Appartement"
                    count={486}
                    percentage={37.8}
                    icon="/icons/filter-apartment.png"
                  />
                  <PropertyTypeItem type="Maison" count={312} percentage={24.3} icon="/icons/filter-house.png" />
                  <PropertyTypeItem type="Riad" count={198} percentage={15.4} icon="/icons/filter-riad.png" />
                  <PropertyTypeItem type="Villa" count={156} percentage={12.1} icon="/icons/filter-villa.png" />
                  <PropertyTypeItem type="Studio" count={132} percentage={10.3} icon="/icons/filter-studio.png" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Villes populaires</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <CityItem city="Casablanca" count={342} percentage={26.6} image="/images/cities/casablanca.png" />
                  <CityItem city="Marrakech" count={286} percentage={22.3} image="/images/cities/marrakech.png" />
                  <CityItem city="Rabat" count={198} percentage={15.4} image="/images/cities/rabat.png" />
                  <CityItem city="Agadir" count={156} percentage={12.1} image="/images/cities/agadir.png" />
                  <CityItem city="Fès" count={132} percentage={10.3} image="/images/cities/fes.png" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: "blue" | "green" | "amber" | "rose" | "purple";
}

function StatsCard({ title, value, description, trend, icon, color }: StatsCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className={`p-2 rounded-full ${colorClasses[color]}`}>{icon}</div>
            <div className="flex items-center">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-rose-500 mr-1" />
              )}
              <span className={trend === "up" ? "text-green-500 text-sm" : "text-rose-500 text-sm"}>{description}</span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold">{value}</h3>
            <p className="text-sm text-gray-500 mt-1">{title}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  iconColor: string;
}

function ActivityItem({ icon, title, description, time, iconColor }: ActivityItemProps) {
  return (
    <div className="flex items-start">
      <div className={`p-2 rounded-full ${iconColor} mr-3 mt-0.5`}>{icon}</div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

interface PendingPropertyItemProps {
  title: string;
  location: string;
  owner: string;
  time: string;
  image: string;
}

function PendingPropertyItem({ title, location, owner, time, image }: PendingPropertyItemProps) {
  return (
    <div className="flex items-start">
      <div className="relative h-12 w-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
        <img src={image || "/placeholder.svg"} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-xs text-gray-500">{location}</p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-400">Par {owner}</p>
          <p className="text-xs text-gray-400">{time}</p>
        </div>
      </div>
    </div>
  );
}

interface StatusItemProps {
  label: string;
  value: number;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

function StatusItem({ label, value, percentage, icon, color }: StatusItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className={`p-1.5 rounded-full ${color} mr-2`}>{icon}</div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">{value}</span>
        <Badge variant="secondary" className="text-xs">
          {percentage}%
        </Badge>
      </div>
    </div>
  );
}

interface PropertyTypeItemProps {
  type: string;
  count: number;
  percentage: number;
  icon: string;
}

function PropertyTypeItem({ type, count, percentage, icon }: PropertyTypeItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-8 w-8 relative mr-2">
          <img src={icon || "/placeholder.svg"} alt={type} width={32} height={32} className="object-contain" />
        </div>
        <span className="text-sm font-medium">{type}</span>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">{count}</span>
        <Badge variant="secondary" className="text-xs">
          {percentage}%
        </Badge>
      </div>
    </div>
  );
}

interface CityItemProps {
  city: string;
  count: number;
  percentage: number;
  image: string;
}

function CityItem({ city, count, percentage, image }: CityItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-8 w-8 relative mr-2 rounded-full overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={city} width={32} height={32} className="object-cover w-full h-full" />
        </div>
        <span className="text-sm font-medium">{city}</span>
      </div>
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">{count}</span>
        <Badge variant="secondary" className="text-xs">
          {percentage}%
        </Badge>
      </div>
    </div>
  );
}
AdminDashboard.layout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default AdminDashboard;