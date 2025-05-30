// Add this mapping function
function mapServerDataToPropriete(serverData: any): Propriete {
  return {
    id: Number(serverData.id), // Convert string id to number
    loueur_id: serverData.loueur_id || 0,
    titre: serverData.title,
    localisation: serverData.location,
    prixParMois: serverData.price,
    imgs: serverData.images,
    description: serverData.description || "",
    disponibilite: true,
    type: serverData.type || "Appartement",
    nbrchambre: serverData.bedrooms || 1,
    surface: serverData.area || 0,
    adresse: serverData.address || "",
    admin_id: serverData.admin_id || 0,
    loueur: {
      id: serverData.owner_id || 0,
      user: {
        name: serverData.owner_name || "",
        email: serverData.owner_email || "",
        prenom: serverData.owner_firstname || "",
        genre: serverData.owner_gender || "",
        telephone: serverData.owner_phone || "",
        profile: serverData.owner_profile || "/placeholder.svg"
      }
    },
    commodites: serverData.amenities?.map((amenity: any) => ({
      id: amenity.id || 0,
      commodite: amenity.name || "",
      categorie: amenity.category || ""
    })) || []
  };
}

// In your component, map the server data before using it
export default function ListProprietes() {
  // ... existing code ...

  // When receiving data from server, map it
  const proprietes = serverData.map(mapServerDataToPropriete);

  // ... rest of the component code ...
} 