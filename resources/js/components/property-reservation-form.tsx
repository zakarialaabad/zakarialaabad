import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Users, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TimePicker } from "@/components/time-picker";
import { useNotifications } from "@/contexts/notifications-context";

// Constants
const MIN_PHONE_LENGTH = 8;

interface PropertyReservationFormProps {
  price: number;
  priceUnit: string;
  maxGuests: number;
  owner: {
    name: string;
    phone: string;
  };
}

export function PropertyReservationForm({ price, priceUnit, maxGuests, owner }: PropertyReservationFormProps) {
  const [guests, setGuests] = useState(1);
  const [duration, setDuration] = useState(1); // Par défaut 1 mois
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const { addNotification } = useNotifications();

  // Form validation
  const isFormValid = selectedTime && appointmentDate && phone.length >= MIN_PHONE_LENGTH;

  // Memoized event handlers
  const handleConfirm = useCallback(() => {
    if (isFormValid) {
      addNotification({
        title: "Réservation confirmée",
        message: `Votre demande de rendez-vous pour le ${appointmentDate} à ${selectedTime} a été envoyée avec succès.`,
        type: "success",
        link: "/dashboard/messages",
      });

      setIsAppointmentModalOpen(false);
      setSelectedTime(null);
      setAppointmentDate("");
      setPhone("");
    }
  }, [isFormValid, appointmentDate, selectedTime, phone, addNotification]);

  // Options de durée de location
  const durationOptions = [
    { value: 1, label: "1 mois" },
    { value: 2, label: "2 mois" },
    { value: 3, label: "3 mois" },
    { value: 6, label: "6 mois" },
    { value: 12, label: "1 an (12 mois)" },
    { value: 24, label: "2 ans (24 mois)" },
    { value: 36, label: "3 ans (36 mois)" },
  ];

  // Options pour le nombre de personnes
  const guestOptions = [
    { value: 1, label: "1 personne" },
    { value: 2, label: "2 personnes" },
    { value: 3, label: "3 personnes" },
    { value: 4, label: "4 personnes" },
    { value: 5, label: "5+ personnes" },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-600">{priceUnit}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="mr-1 h-4 w-4" />
          <span>Disponible maintenant</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Nombre de personnes */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Nombre de personnes</label>
          <Select value={guests.toString()} onValueChange={(value) => setGuests(Number.parseInt(value))}>
            <SelectTrigger className="w-full border-gray-300 bg-white">
              <SelectValue placeholder="Sélectionner">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-gray-400" />
                  <span>{guests === 5 ? "5+ personnes" : `${guests} personne${guests > 1 ? "s" : ""}`}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {guestOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Durée de location */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Durée de location</label>
          <Select value={duration.toString()} onValueChange={(value) => setDuration(Number.parseInt(value))}>
            <SelectTrigger className="w-full border-gray-300 bg-white">
              <SelectValue placeholder="Sélectionner">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  <span>
                    {durationOptions.find((option) => option.value === duration)?.label || `${duration} mois`}
                  </span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {durationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 space-y-3">
          <div className="flex items-start gap-2">
            <div className="mt-0.5 text-[#465baa]">
              <Calendar className="h-4 w-4" />
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Prix affiché directement</span> — Pour toute réservation ou information
              complémentaire, veuillez contacter le propriétaire.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#465baa]/10 p-2 rounded-md">
            <div className="text-[#465baa]">
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
                className="h-4 w-4"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
              </svg>
            </div>
            <p className="text-sm font-medium text-[#465baa]">
              E-JAR ne prend aucune commission — notre plateforme est entièrement gratuite.
            </p>
          </div>
        </div>

        {/* Boutons d'action */}
        <Button
          className="w-full bg-[#465baa] py-6 text-base font-medium text-white hover:bg-[#465baa]/90"
          onClick={() => setIsAppointmentModalOpen(true)}
        >
          Réserver un rendez-vous
        </Button>
      </div>

      <Dialog open={isAppointmentModalOpen} onOpenChange={setIsAppointmentModalOpen}>
        <DialogContent className="rounded-lg border bg-white p-4 shadow-lg sm:max-w-[450px]">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-xl font-bold text-gray-900">Réserver un rendez-vous</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div className="space-y-1">
              <label htmlFor="appointment-date" className="block text-sm font-medium text-gray-700">
                Date <span className="text-red-500">*</span>
              </label>
              <Input
                id="appointment-date"
                type="date"
                className="w-full border-gray-300 bg-white"
                min={new Date().toISOString().split("T")[0]}
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Heure <span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center">
                <TimePicker value={selectedTime} onChange={setSelectedTime} />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="appointment-phone" className="block text-sm font-medium text-gray-700">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <Input
                id="appointment-phone"
                type="tel"
                placeholder="Votre numéro de téléphone"
                className="w-full border-gray-300 bg-white"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              {phone && phone.length < MIN_PHONE_LENGTH && (
                <p className="mt-1 text-xs text-red-500">Veuillez entrer un numéro de téléphone valide</p>
              )}
            </div>
          </div>
          <DialogFooter className="mt-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsAppointmentModalOpen(false)}
              className="flex-1 border-[#465baa] text-[#465baa] hover:bg-[#465baa]/10"
            >
              Annuler
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!isFormValid}
              className={`flex-1 py-2 text-base font-medium text-white ${
                isFormValid ? "bg-[#465baa] hover:bg-[#465baa]/90" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
