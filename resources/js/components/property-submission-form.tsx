import type React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyTypeSelect } from "./property-type-select";
import { useState, useEffect } from "react";
import { X, Upload, ImageIcon } from "lucide-react";

type PreviewFields =
  | "titre"
  | "description"
  | "type"
  | "typesLocaires"
  | "ville"
  | "localisation"
  | "address"
  | "surface"
  | "nbrchambre"
  | "bathrooms"
  | "imgs"
  | "prixParMois"
  | "minimumStay"
  | "availableFrom"
  | "regles.petsAllowed"
  | "regles.smokingAllowed"
  | "regles.smallPetsOnly"
  | "regles.petFee"
  | "regles.petDeposit"
  | "regles.noDrugs"
  | "regles.smokingOutdoorOnly"
  | "regles.ecigaretteAllowed"
  | "regles.eventsAllowed"
  | "regles.partiesAllowed"
  | "regles.additionalGuestsAllowed"
  | "regles.guestRegistration"
  | "regles.quietHours"
  | "regles.noLoudMusic"
  | "regles.respectNeighbors"
  | "regles.noPartiesWeekdays"
  | "regles.childFriendly"
  | "regles.babyFriendly"
  | "regles.familyFriendly"
  | "regles.childSafetyFeatures"
  | "regles.noCandles"
  | "regles.noModifications"
  | "regles.cleaningRequired"
  | "regles.trashDisposalregles"
  | "regles.additionalregles"
  | 'regles.depositWithheld'
  | 'regles.earlyTermination'
  | 'regles.additionalFees'
  | 'regles.penaltyDetails';

interface PropertySubmissionFormProps {
  onSubmit: (data: any) => void;
  onFieldFocus?: (fieldName: PreviewFields) => void;
  onFieldBlur?: () => void;
  currentStep?: number;
  goToNextStep?: () => void;
  goToPreviousStep?: () => void;
  totalSteps?: number;
}

interface ImagePreview {
  preview: string;
  fileInfo: {
    name: string;
    size: number;
    type: string;
  } | null;
}

const PropertySubmissionForm = ({
  onSubmit,
  onFieldFocus,
  onFieldBlur,
  currentStep = 1,
  goToNextStep,
  goToPreviousStep,
  totalSteps = 8,
}: PropertySubmissionFormProps) => {
  const methods = useFormContext();
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newFiles = [...imageFiles];
      const newPreviews = [...imagePreviews];
      const formImages: { preview: string; fileInfo: { name: string; size: number; type: string } }[] = [];

      let filesProcessed = 0;

      files.forEach((file) => {
        if (newFiles.length < 5) {
          newFiles.push(file);
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              newPreviews.push(reader.result.toString());
              formImages.push({
                preview: reader.result.toString(),
                fileInfo: {
                  name: file.name,
                  size: file.size,
                  type: file.type,
                },
              });
            }
            filesProcessed++;
            // When all files are processed, update state and form
            if (filesProcessed === files.length) {
              setImageFiles([...newFiles]);
              setImagePreviews([...newPreviews]);
              methods.setValue("imgs", formImages);
              onFieldFocus?.("imgs");
            }
          };
          reader.readAsDataURL(file);
        } else {
          filesProcessed++;
        }
      });
    }
  };

  // Remove an image
  const removeImage = (index: number) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);

    // Update form data with remaining images
    const formImages = newPreviews.map((preview, idx) => ({
      preview,
      fileInfo: newFiles[idx]
        ? {
            name: newFiles[idx].name,
            size: newFiles[idx].size,
            type: newFiles[idx].type,
          }
        : null,
    }));
    methods.setValue("imgs", formImages);
  };

  // Load existing images from form data if available
  useEffect(() => {
    const existingImages = methods.watch("imgs") as ImagePreview[] | undefined;
    if (existingImages && existingImages.length > 0) {
      setImagePreviews(existingImages.map((img) => img.preview));
    }
  }, [methods]);

  // Function to handle navigation between steps by skipping step 6
  const handleNext = () => {
    goToNextStep?.();

  };

  // Function to handle going back by skipping step 6
  const handlePrevious = () => {
    // If we are at step 7, go back directly to step 5
    if (currentStep === 7) {
      goToPreviousStep?.();
      goToPreviousStep?.();
    } else {
      goToPreviousStep?.();
    }
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
      {currentStep === 1 && (
        <div>
          <h2>Informations de base</h2>
          <Label htmlFor="titre">Titre de l'annonce</Label>
          <Input id="titre" {...methods.register("titre")} onFocus={() => onFieldFocus?.("titre")} onBlur={onFieldBlur} />

          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...methods.register("description")}
            onFocus={() => onFieldFocus?.("description")}
            onBlur={onFieldBlur}
          />

          <Label htmlFor="type">Type de bien</Label>
          <PropertyTypeSelect
            value={methods.watch("type")}
            onValueChange={(value) => methods.setValue("type", value)}
            onFocus={() => onFieldFocus?.("type")}
            onBlur={onFieldBlur}
          />

          <Label htmlFor="typesLocaires">Type de locataire idéal</Label>
          <Select
            onValueChange={(value) => methods.setValue("typesLocaires", value)}
            onOpenChange={(open) => {
              if (open) onFieldFocus?.("typesLocaires");
              else onFieldBlur?.();
            }}
            value={methods.watch("typesLocaires")}
          >
            <SelectTrigger data-tenant-type="true">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tout" data-tenant-type>
                Tout
              </SelectItem>
              <SelectItem value="famille" data-tenant-type>
                Famille
              </SelectItem>
              <SelectItem value="marie" data-tenant-type>
                Marié
              </SelectItem>
              <SelectItem value="étudiant" data-tenant-type>
                Étudiant
              </SelectItem>
              <SelectItem value="célibataire" data-tenant-type>
                Célibataire
              </SelectItem>
              <SelectItem value="fonctionnaire" data-tenant-type>
                Fonctionnaire
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2>Localisation</h2>
          <Label htmlFor="ville">Ville</Label>
          <Select
            onValueChange={(value) => methods.setValue("ville", value)}
            onOpenChange={(open) => {
              if (open) onFieldFocus?.("ville");
              else onFieldBlur?.();
            }}
            value={methods.watch("ville")}
          >
            <SelectTrigger id="ville" className="w-full">
              <SelectValue placeholder="Sélectionner une ville" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casablanca">Casablanca</SelectItem>
              <SelectItem value="rabat">Rabat</SelectItem>
              <SelectItem value="marrakech">Marrakech</SelectItem>
              <SelectItem value="fes">Fès</SelectItem>
              <SelectItem value="tanger">Tanger</SelectItem>
              <SelectItem value="agadir">Agadir</SelectItem>
              <SelectItem value="meknes">Meknès</SelectItem>
              <SelectItem value="oujda">Oujda</SelectItem>
              <SelectItem value="kenitra">Kénitra</SelectItem>
              <SelectItem value="tetouan">Tétouan</SelectItem>
              <SelectItem value="safi">Safi</SelectItem>
              <SelectItem value="mohammedia">Mohammedia</SelectItem>
              <SelectItem value="el_jadida">El Jadida</SelectItem>
              <SelectItem value="beni_mellal">Béni Mellal</SelectItem>
              <SelectItem value="nador">Nador</SelectItem>
              <SelectItem value="taza">Taza</SelectItem>
              <SelectItem value="settat">Settat</SelectItem>
              <SelectItem value="berrechid">Berrechid</SelectItem>
              <SelectItem value="larache">Larache</SelectItem>
              <SelectItem value="khouribga">Khouribga</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="localisation">Quartier</Label>
          <Select
            onValueChange={(value) => methods.setValue("localisation", value)}
            onOpenChange={(open) => {
              if (open) onFieldFocus?.("localisation");
              else onFieldBlur?.();
            }}
            value={methods.watch("localisation")}
            disabled={!methods.watch("ville")}
          >
            <SelectTrigger id="localisation" className="w-full">
              <SelectValue
                placeholder={
                  methods.watch("ville") ? "Sélectionner un quartier" : "Veuillez d'abord sélectionner une ville"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {methods.watch("ville") === "casablanca" && (
                <>
                  <SelectItem value="ain_diab">Aïn Diab</SelectItem>
                  <SelectItem value="anfa">Anfa</SelectItem>
                  <SelectItem value="maarif">Maârif</SelectItem>
                  <SelectItem value="bourgogne">Bourgogne</SelectItem>
                  <SelectItem value="sidi_belyout">Sidi Belyout</SelectItem>
                  <SelectItem value="racine">Racine</SelectItem>
                  <SelectItem value="gauthier">Gauthier</SelectItem>
                  <SelectItem value="derb_ghallef">Derb Ghallef</SelectItem>
                  <SelectItem value="hay_hassani">Hay Hassani</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                </>
              )}
              {methods.watch("ville") === "rabat" && (
                <>
                  <SelectItem value="agdal">Agdal</SelectItem>
                  <SelectItem value="hay_riad">Hay Riad</SelectItem>
                  <SelectItem value="souissi">Souissi</SelectItem>
                  <SelectItem value="hassan">Hassan</SelectItem>
                  <SelectItem value="medina">Médina</SelectItem>
                  <SelectItem value="les_orangers">Les Orangers</SelectItem>
                  <SelectItem value="yacoub_el_mansour">Yacoub El Mansour</SelectItem>
                  <SelectItem value="ocean">Océan</SelectItem>
                </>
              )}
              {methods.watch("ville") === "marrakech" && (
                <>
                  <SelectItem value="gueliz">Guéliz</SelectItem>
                  <SelectItem value="hivernage">Hivernage</SelectItem>
                  <SelectItem value="medina">Médina</SelectItem>
                  <SelectItem value="palmeraie">Palmeraie</SelectItem>
                  <SelectItem value="targa">Targa</SelectItem>
                  <SelectItem value="amerchich">Amerchich</SelectItem>
                  <SelectItem value="sidi_ghanem">Sidi Ghanem</SelectItem>
                  <SelectItem value="agdal">Agdal</SelectItem>
                </>
              )}
              {methods.watch("ville") === "fes" && (
                <>
                  <SelectItem value="ville_nouvelle">Ville Nouvelle</SelectItem>
                  <SelectItem value="medina">Médina</SelectItem>
                  <SelectItem value="route_imouzzer">Route Imouzzer</SelectItem>
                  <SelectItem value="route_sefrou">Route Sefrou</SelectItem>
                  <SelectItem value="narjiss">Narjiss</SelectItem>
                  <SelectItem value="saiss">Saïss</SelectItem>
                  <SelectItem value="rcif">Rcif</SelectItem>
                </>
              )}
              {methods.watch("ville") === "tanger" && (
                <>
                  <SelectItem value="centre_ville">Centre Ville</SelectItem>
                  <SelectItem value="malabata">Malabata</SelectItem>
                  <SelectItem value="marshan">Marshan</SelectItem>
                  <SelectItem value="iberia">Iberia</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="boubana">Boubana</SelectItem>
                  <SelectItem value="medina">Médina</SelectItem>
                </>
              )}
              {methods.watch("ville") === "agadir" && (
                <>
                  <SelectItem value="centre_ville">Centre Ville</SelectItem>
                  <SelectItem value="sonaba">Sonaba</SelectItem>
                  <SelectItem value="founty">Founty</SelectItem>
                  <SelectItem value="charaf">Charaf</SelectItem>
                  <SelectItem value="talborjt">Talborjt</SelectItem>
                  <SelectItem value="dakhla">Dakhla</SelectItem>
                  <SelectItem value="tikiouine">Tikiouine</SelectItem>
                </>
              )}
              {methods.watch("ville") &&
                !["casablanca", "rabat", "marrakech", "fes", "tanger", "agadir"].includes(methods.watch("ville")) && (
                  <SelectItem value="centre_ville">Centre Ville</SelectItem>
                )}
            </SelectContent>
          </Select>

          <Label htmlFor="address">Adresse</Label>
          <Input
            id="address"
            {...methods.register("address")}
            onFocus={() => onFieldFocus?.("address")}
            onBlur={onFieldBlur}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h2>Caractéristiques</h2>
          <Label htmlFor="surface">Superficie (m²)</Label>
          <Input
            id="surface"
            type="number"
            {...methods.register("surface")}
            onFocus={() => onFieldFocus?.("surface")}
            onBlur={onFieldBlur}
          />

          <Label htmlFor="nbrchambre">Nombre de chambres</Label>
          <Input
            id="nbrchambre"
            type="number"
            {...methods.register("nbrchambre")}
            onFocus={() => onFieldFocus?.("nbrchambre")}
            onBlur={onFieldBlur}
          />

          <Label htmlFor="bathrooms">Nombre de salles de bain</Label>
          <Input
            id="bathrooms"
            type="number"
            {...methods.register("bathrooms")}
            onFocus={() => onFieldFocus?.("bathrooms")}
            onBlur={onFieldBlur}
          />
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Photos</h2>
          <p className="text-gray-600 mb-4">
            Ajoutez jusqu'à 5 photos de votre bien (la première sera l'image principale)
          </p>

          {/* Image upload surface */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => document.getElementById("image-upload")?.click()}
            onFocus={() => onFieldFocus?.("imgs")}
            onBlur={onFieldBlur}
          >
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={imageFiles.length >= 5}
            />
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">
                {imageFiles.length >= 5 ? "Nombre maximum d'images atteint (5)" : "Cliquez pour ajouter des photos"}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {imageFiles.length >= 5
                  ? "Supprimez une image pour en ajouter une nouvelle"
                  : "JPG, PNG ou GIF • Max 5 images"}
              </p>
            </div>
          </div>

          {/* Image previews */}
          {imagePreviews.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Images téléchargées ({imagePreviews.length}/5)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Image ${index + 1}`}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opaville-0 group-hover:opaville-100 transition-opaville"
                      aria-label={`Supprimer l'image ${index + 1}`}
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-md">
                        Image principale
                      </div>
                    )}
                  </div>
                ))}

                {/* Empty slots */}
                {Array.from({ length: Math.max(0, 5 - imagePreviews.length) }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="aspect-square rounded-md border border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <div className="flex flex-col items-center text-gray-400">
                      <ImageIcon className="h-6 w-6 mb-1" />
                      <span className="text-xs">Ajouter</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {currentStep === 5 && (
        <div>
          <h2>Prix et disponibilité</h2>
          <Label htmlFor="prixParMois">Prix</Label>
          <Input
            id="prixParMois"
            type="number"
            {...methods.register("prixParMois")}
            onFocus={() => onFieldFocus?.("prixParMois")}
            onBlur={onFieldBlur}
          />
        </div>
      )}

      {currentStep === 7 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-4">Règles de la propriété</h2>
          <p className="text-gray-600 mb-4">
            Définissez clairement les règles pour votre propriété afin d'éviter tout malentendu avec les locataires.
          </p>

          {/* Règles principales - Première rangée */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <span className="bg-blue-100 text-blue-800 p-1 rounded-md mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-paw-print"
                  >
                    <circle cx="11" cy="4" r="2" />
                    <circle cx="18" cy="8" r="2" />
                    <circle cx="20" cy="16" r="2" />
                    <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
                  </svg>
                </span>
                Animaux
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="petsAllowed"
                    {...methods.register("regles.petsAllowed")}
                    onFocus={() => onFieldFocus?.("regles.petsAllowed")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="petsAllowed" className="font-normal">
                    Animaux autorisés
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smallPetsOnly"
                    {...methods.register("regles.smallPetsOnly")}
                    onFocus={() => onFieldFocus?.("regles.smallPetsOnly")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="smallPetsOnly" className="font-normal">
                    Petits animaux uniquement
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="petFee"
                    {...methods.register("regles.petFee")}
                    onFocus={() => onFieldFocus?.("regles.petFee")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="petFee" className="font-normal">
                    Frais supplémentaires pour animaux
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="petDeposit"
                    {...methods.register("regles.petDeposit")}
                    onFocus={() => onFieldFocus?.("regles.petDeposit")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="petDeposit" className="font-normal">
                    Caution spécifique pour animaux
                  </Label>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <span className="bg-red-100 text-red-800 p-1 rounded-md mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-cigarette"
                  >
                    <path d="M18 12H2v4h16" />
                    <path d="M22 12v4" />
                    <path d="M7 12v4" />
                    <path d="M18 8c0-2.5-2-2.5-2-5" />
                    <path d="M22 8c0-2.5-2-2.5-2-5" />
                  </svg>
                </span>
                Tabac et substances
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smokingAllowed"
                    {...methods.register("regles.smokingAllowed")}
                    onFocus={() => onFieldFocus?.("regles.smokingAllowed")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="smokingAllowed" className="font-normal">
                    Fumer autorisé
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smokingOutdoorOnly"
                    {...methods.register("regles.smokingOutdoorOnly")}
                    onFocus={() => onFieldFocus?.("regles.smokingOutdoorOnly")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="smokingOutdoorOnly" className="font-normal">
                    Fumer autorisé à l'extérieur uniquement
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ecigaretteAllowed"
                    {...methods.register("regles.ecigaretteAllowed")}
                    onFocus={() => onFieldFocus?.("regles.ecigaretteAllowed")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="ecigaretteAllowed" className="font-normal">
                    Cigarette électronique autorisée
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noDrugs"
                    {...methods.register("regles.noDrugs")}
                    onFocus={() => onFieldFocus?.("regles.noDrugs")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="noDrugs" className="font-normal">
                    Substances illicites interdites
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Règles principales - Deuxième rangée */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <span className="bg-purple-100 text-purple-800 p-1 rounded-md mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-party-popper"
                  >
                    <path d="M5.8 11.3 2 22l10.7-3.79" />
                    <path d="M4 3h.01" />
                    <path d="M22 8h.01" />
                    <path d="M15 2h.01" />
                    <path d="M22 20h.01" />
                    <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
                    <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11v0c-.11.7-.72 1.22-1.43 1.22H17" />
                    <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98v0C9.52 4.9 9 5.52 9 6.23V7" />
                    <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
                  </svg>
                </span>
                Événements et invités
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="eventsAllowed"
                    {...methods.register("regles.eventsAllowed")}
                    onFocus={() => onFieldFocus?.("regles.eventsAllowed")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="eventsAllowed" className="font-normal">
                    Événements autorisés
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="partiesAllowed"
                    {...methods.register("regles.partiesAllowed")}
                    onFocus={() => onFieldFocus?.("regles.partiesAllowed")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="partiesAllowed" className="font-normal">
                    Fêtes autorisées
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="additionalGuestsAllowed"
                    {...methods.register("regles.additionalGuestsAllowed")}
                    onFocus={() => onFieldFocus?.("regles.additionalGuestsAllowed")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="additionalGuestsAllowed" className="font-normal">
                    Invités supplémentaires autorisés
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="guestRegistration"
                    {...methods.register("regles.guestRegistration")}
                    onFocus={() => onFieldFocus?.("regles.guestRegistration")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="guestRegistration" className="font-normal">
                    Enregistrement des invités requis
                  </Label>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <span className="bg-green-100 text-green-800 p-1 rounded-md mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-volume-2"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </span>
                Bruit et voisinage
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="quietHours"
                    {...methods.register("regles.quietHours")}
                    onFocus={() => onFieldFocus?.("regles.quietHours")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="quietHours" className="font-normal">
                    Heures de silence (22h-8h)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noLoudMusic"
                    {...methods.register("regles.noLoudMusic")}
                    onFocus={() => onFieldFocus?.("regles.noLoudMusic")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="noLoudMusic" className="font-normal">
                    Musique forte interdite
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="respectNeighbors"
                    {...methods.register("regles.respectNeighbors")}
                    onFocus={() => onFieldFocus?.("regles.respectNeighbors")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="respectNeighbors" className="font-normal">
                    Respect des voisins exigé
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noPartiesWeekdays"
                    {...methods.register("regles.noPartiesWeekdays")}
                    onFocus={() => onFieldFocus?.("regles.noPartiesWeekdays")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="noPartiesWeekdays" className="font-normal">
                    Pas de fêtes en semaine
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Règles principales - Troisième rangée */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <span className="bg-amber-100 text-amber-800 p-1 rounded-md mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-baby"
                  >
                    <path d="M9 12h.01" />
                    <path d="M15 12h.01" />
                    <path d="M10 16c.5.3 1.5.5 2 .5s1.5-.2 2-.5" />
                    <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 0 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 0 0-3.6A9 9 0 0 1 5 6.3" />
                    <path d="M6 9a6 6 0 0 1 12 0" />
                  </svg>
                </span>
                Enfants et famille
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="childFriendly"
                    {...methods.register("regles.childFriendly")}
                    onFocus={() => onFieldFocus?.("regles.childFriendly")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="childFriendly" className="font-normal">
                    Adapté aux enfants
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="babyFriendly"
                    {...methods.register("regles.babyFriendly")}
                    onFocus={() => onFieldFocus?.("regles.babyFriendly")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="babyFriendly" className="font-normal">
                    Adapté aux bébés
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="familyFriendly"
                    {...methods.register("regles.familyFriendly")}
                    onFocus={() => onFieldFocus?.("regles.familyFriendly")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="familyFriendly" className="font-normal">
                    Idéal pour les familles
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="childSafetyFeatures"
                    {...methods.register("regles.childSafetyFeatures")}
                    onFocus={() => onFieldFocus?.("regles.childSafetyFeatures")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="childSafetyFeatures" className="font-normal">
                    Équipements de sécurité pour enfants
                  </Label>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <span className="bg-cyan-100 text-cyan-800 p-1 rounded-md mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shield-check"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                Sécurité et entretien
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noCandles"
                    {...methods.register("regles.noCandles")}
                    onFocus={() => onFieldFocus?.("regles.noCandles")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="noCandles" className="font-normal">
                    Bougies interdites
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noModifications"
                    {...methods.register("regles.noModifications")}
                    onFocus={() => onFieldFocus?.("regles.noModifications")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="noModifications" className="font-normal">
                    Pas de modifications du logement
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="cleaningRequired"
                    {...methods.register("regles.cleaningRequired")}
                    onFocus={() => onFieldFocus?.("regles.cleaningRequired")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="cleaningRequired" className="font-normal">
                    Nettoyage requis avant départ
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trashDisposalregles"
                    {...methods.register("regles.trashDisposalregles")}
                    onFocus={() => onFieldFocus?.("regles.trashDisposalregles")}
                    onBlur={onFieldBlur}
                  />
                  <Label htmlFor="trashDisposalregles" className="font-normal">
                    Règles de tri des déchets à respecter
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Règles supplémentaires */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm border-primary border-2">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <span className="bg-primary/20 text-primary p-1 rounded-md mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list-plus"
                >
                  <path d="M11 12H3" />
                  <path d="M16 6H3" />
                  <path d="M16 18H3" />
                  <path d="M18 9v6" />
                  <path d="M21 12h-6" />
                </svg>
              </span>
              Règles supplémentaires
            </h3>
            <p className="text-gray-600 mb-3">
              Ajoutez des règles spécifiques qui ne sont pas couvertes par les catégories ci-dessus.
            </p>
            <Textarea
              id="additionalregles"
              placeholder="Ajoutez d'autres règles ou précisions importantes pour votre propriété..."
              className="min-h-[100px]"
              {...methods.register("regles.additionalregles")}
              onFocus={() => onFieldFocus?.("regles.additionalregles")}
              onBlur={onFieldBlur}
            />
          </div>

          {/* Sanctions et pénalités */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <span className="bg-red-100 text-red-800 p-1 rounded-md mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-alert-triangle"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                </svg>
              </span>
              Conséquences en cas de non-respect
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="depositWithheld"
                  {...methods.register("regles.depositWithheld")}
                  onFocus={() => onFieldFocus?.("regles.depositWithheld")}
                  onBlur={onFieldBlur}
                />
                <Label htmlFor="depositWithheld" className="font-normal">
                  Retenue sur caution possible
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="earlyTermination"
                  {...methods.register("regles.earlyTermination")}
                  onFocus={() => onFieldFocus?.("regles.earlyTermination")}
                  onBlur={onFieldBlur}
                />
                <Label htmlFor="earlyTermination" className="font-normal">
                  Résiliation anticipée possible
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="additionalFees"
                  {...methods.register("regles.additionalFees")}
                  onFocus={() => onFieldFocus?.("regles.additionalFees")}
                  onBlur={onFieldBlur}
                />
                <Label htmlFor="additionalFees" className="font-normal">
                  Frais supplémentaires applicables
                </Label>
              </div>
              <Textarea
                id="penaltyDetails"
                placeholder="Précisez les conséquences en cas de non-respect des règles..."
                className="mt-2"
                {...methods.register("regles.penaltyDetails")}
                onFocus={() => onFieldFocus?.("regles.penaltyDetails")}
                onBlur={onFieldBlur}
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 8 is hidden as per the request */}

      <div className="flex justify-between">
        {currentStep > 1 && (
          <Button variant="outline" onClick={handlePrevious}>
            Précédent
          </Button>
        )}
        {currentStep < totalSteps ? (
          <Button type="button" onClick={handleNext}>
            Suivant
          </Button>
        ) : (
          <Button type="submit">Soumettre</Button>
        )}
      </div>
    </form>
  );
};

// Export both named and default exports
export { PropertySubmissionForm };
export default PropertySubmissionForm;
