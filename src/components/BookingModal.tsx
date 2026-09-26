import React, { useState, useEffect } from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import { SalonService, Appointment } from '../types/salon.ts';
import {
  X,
  Check,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  Navigation,
  CalendarPlus,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingOpen,
    closeBooking,
    services,
    selectedServiceId,
    addAppointment,
    businessInfo,
  } = useSalon();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedService, setSelectedService] = useState<SalonService | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Initialize or sync selected service
  useEffect(() => {
    if (selectedServiceId) {
      const found = services.find((s) => s.id === selectedServiceId);
      if (found) {
        setSelectedService(found);
        setStep(2); // Jump to date if service already picked
      }
    } else if (services.length > 0 && !selectedService) {
      setSelectedService(services[0]);
    }
  }, [selectedServiceId, services]);

  if (!isBookingOpen) return null;

  // Generate available dates (next 14 days, skipping Mondays and Sundays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon

      if (dayOfWeek !== 0 && dayOfWeek !== 1) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const iso = `${yyyy}-${mm}-${dd}`;
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        const monthName = d.toLocaleDateString('en-US', { month: 'short' });
        const dayNum = d.getDate();

        dates.push({
          iso,
          label: `${dayName}, ${monthName} ${dayNum}`,
          isSaturday: dayOfWeek === 6,
        });
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  // Generate available time slots based on selected date
  const getTimeSlots = () => {
    if (!selectedDate) return [];
    const dateObj = new Date(selectedDate);
    const isSaturday = dateObj.getDay() === 6;

    // Saturday: 10:00 - 15:00 (last slot 14:00)
    // Tue - Fri: 10:00 - 19:00 (last slot 18:00)
    const slots = [];
    const startHour = 10;
    const endHour = isSaturday ? 14 : 18;

    for (let hour = startHour; hour <= endHour; hour++) {
      slots.push(`${hour < 10 ? '0' : ''}${hour}:00`);
      if (hour < endHour || !isSaturday) {
        slots.push(`${hour < 10 ? '0' : ''}${hour}:30`);
      }
    }
    return slots;
  };

  const timeSlots = getTimeSlots();

  // Validate Step 4 customer inputs
  const validateCustomer = () => {
    const errors: Record<string, string> = {};
    if (!customer.name.trim()) errors.name = 'Please provide your full name.';
    if (!customer.email.trim() || !customer.email.includes('@')) errors.email = 'Valid email required for confirmation.';
    if (!customer.phone.trim() || customer.phone.length < 6) errors.phone = 'Valid phone number required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Final confirmation submission
  const handleConfirm = () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    const apt = addAppointment({
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      category: selectedService.category,
      date: selectedDate,
      time: selectedTime,
      clientName: customer.name.trim(),
      clientEmail: customer.email.trim(),
      clientPhone: customer.phone.trim(),
      clientNotes: customer.notes.trim(),
    });

    setConfirmedBooking(apt);
    setStep(5);
  };

  // Reset and close
  const handleModalClose = () => {
    closeBooking();
    setTimeout(() => {
      setStep(1);
      setSelectedDate('');
      setSelectedTime('');
      setCustomer({ name: '', email: '', phone: '', notes: '' });
      setConfirmedBooking(null);
    }, 200);
  };

  // Add to Calendar iCalendar (.ics) Generator
  const downloadIcs = () => {
    if (!confirmedBooking) return;
    const [year, month, day] = confirmedBooking.date.split('-');
    const [hour, minute] = confirmedBooking.time.split(':');

    const startDate = `${year}${month}${day}T${hour}${minute}00`;
    const endHour = String(Number(hour) + 1).padStart(2, '0');
    const endDate = `${year}${month}${day}T${endHour}${minute}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DER SALON//Hair Appointment//EN',
      'BEGIN:VEVENT',
      `UID:${confirmedBooking.referenceCode}@der-salon-frankfurt.de`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:DER SALON — ${confirmedBooking.serviceName}`,
      `DESCRIPTION:Hair appointment at DER SALON. Reference: ${confirmedBooking.referenceCode}`,
      `LOCATION:Oppenheimer Landstraße 63\\, 60596 Frankfurt am Main`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `DER_SALON_${confirmedBooking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openGoogleCalendar = () => {
    if (!confirmedBooking) return;
    const [year, month, day] = confirmedBooking.date.split('-');
    const [hour, minute] = confirmedBooking.time.split(':');
    const startStr = `${year}${month}${day}T${hour}${minute}00`;
    const endHour = String(Number(hour) + 1).padStart(2, '0');
    const endStr = `${year}${month}${day}T${endHour}${minute}00`;

    const title = encodeURIComponent(`DER SALON — ${confirmedBooking.serviceName}`);
    const details = encodeURIComponent(`Appointment code: ${confirmedBooking.referenceCode}\nTel: +49 69 627424`);
    const loc = encodeURIComponent('Oppenheimer Landstraße 63, 60596 Frankfurt am Main');
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${loc}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-2xl w-full border border-[#E8E2D5] shadow-2xl relative overflow-hidden my-auto">
        {/* Modal Top Bar */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#E8E2D5] flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block">
              Reservation
            </span>
            <h2 className="font-serif text-2xl text-[#1A1918]">
              {step === 5 ? 'Confirmation' : 'Book Appointment'}
            </h2>
          </div>
          <button
            onClick={handleModalClose}
            className="p-2 text-[#7D7871] hover:text-[#1A1918] cursor-pointer transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-Step Progress Indicator (Steps 1-4) */}
        {step < 5 && (
          <div className="px-6 sm:px-8 py-3 bg-[#F4EFE6] border-b border-[#E8E2D5] flex items-center justify-between text-xs text-[#7D7871]">
            <span className="font-mono text-[11px] text-[#C5A880] font-semibold">
              Step {step} of 4
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 w-6 rounded-full transition-colors ${
                    step >= s ? 'bg-[#1A1918]' : 'bg-[#DCD6CA]'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs uppercase tracking-wider text-[#1A1918] font-medium">
              {step === 1 && 'Select Service'}
              {step === 2 && 'Select Date'}
              {step === 3 && 'Select Time'}
              {step === 4 && 'Your Details'}
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-[#7D7871] uppercase tracking-wider mb-2">
                Choose a service category:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {services.map((service) => {
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#1A1918] bg-[#F3ECE0] shadow-2xs'
                          : 'border-[#E8E2D5] bg-[#FBF9F6] hover:border-[#C5A880]'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#786C5A] font-medium">
                          {service.category}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-[#1A1918]" />}
                      </div>
                      <h4 className="font-serif text-lg text-[#1A1918] font-medium mb-1">
                        {service.name}
                      </h4>
                      <p className="text-xs text-[#7D7871] font-light mb-3">
                        {service.shortDescription}
                      </p>
                      <div className="text-[11px] text-[#9E988F] font-mono">
                        {service.priceNote} · {service.durationMinutes} min
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: DATE */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-[#7D7871] uppercase tracking-wider">
                  Select an available day:
                </p>
                <span className="text-xs text-[#9E988F]">
                  (Mon & Sun closed)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.iso;
                  return (
                    <button
                      key={item.iso}
                      type="button"
                      onClick={() => setSelectedDate(item.iso)}
                      className={`p-3.5 text-left border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#1A1918] bg-[#1A1918] text-[#FAF7F2]'
                          : 'border-[#E8E2D5] bg-[#FBF9F6] text-[#1A1918] hover:border-[#C5A880]'
                      }`}
                    >
                      <div className={`text-xs font-medium ${isSelected ? 'text-[#FAF7F2]' : 'text-[#1A1918]'}`}>
                        {item.label}
                      </div>
                      <div className={`text-[10px] mt-1 ${isSelected ? 'text-white/70' : 'text-[#7D7871]'}`}>
                        {item.isSaturday ? '10:00 – 15:00' : '10:00 – 19:00'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: TIME */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-[#7D7871] uppercase tracking-wider">
                  Available time slots for {selectedDate}:
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-2 text-center border font-mono text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#1A1918] bg-[#1A1918] text-[#FAF7F2] font-semibold'
                          : 'border-[#E8E2D5] bg-[#FBF9F6] text-[#1A1918] hover:border-[#C5A880]'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-[#7D7871] uppercase tracking-wider mb-2">
                Please enter your contact information:
              </p>
              <div>
                <label className="block text-xs font-medium text-[#1A1918] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#9E988F] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="e.g. Maria Musterfrau"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DCD6CA] text-sm text-[#1A1918] focus:outline-hidden focus:border-[#1A1918]"
                  />
                </div>
                {formErrors.name && (
                  <p className="text-xs text-red-600 mt-1">{formErrors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1A1918] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#9E988F] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DCD6CA] text-sm text-[#1A1918] focus:outline-hidden focus:border-[#1A1918]"
                    />
                  </div>
                  {formErrors.email && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1A1918] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#9E988F] absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="+49 ..."
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DCD6CA] text-sm text-[#1A1918] focus:outline-hidden focus:border-[#1A1918]"
                    />
                  </div>
                  {formErrors.phone && (
                    <p className="text-xs text-red-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1918] mb-1">
                  Notes / Styling Preferences (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#9E988F] absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    value={customer.notes}
                    onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    placeholder="Specific requests, previous treatments, etc."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DCD6CA] text-sm text-[#1A1918] focus:outline-hidden focus:border-[#1A1918]"
                  />
                </div>
              </div>

              {/* Summary review snippet before finalizing */}
              <div className="p-4 bg-[#F4EFE6] border border-[#E8E2D5] text-xs text-[#524F4A] space-y-1">
                <div>
                  <strong>Service:</strong> {selectedService?.name}
                </div>
                <div>
                  <strong>Appointment:</strong> {selectedDate} at {selectedTime}
                </div>
                <div>
                  <strong>Location:</strong> {businessInfo.name}, {businessInfo.street}, {businessInfo.city}
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: APPOINTMENT CONFIRMED SCREEN */}
          {step === 5 && confirmedBooking && (
            <div className="text-center py-4 space-y-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#1A1918] text-[#FAF7F2] flex items-center justify-center">
                <Check className="w-7 h-7" strokeWidth={2.5} />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-medium block mb-1">
                  Booking #{confirmedBooking.referenceCode}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1A1918] uppercase">
                  APPOINTMENT CONFIRMED
                </h3>
                <p className="text-xs text-[#7D7871] mt-1">
                  A confirmation has been saved. We look forward to seeing you.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="bg-[#F6F2EB] border border-[#E8E2D5] p-6 text-left max-w-md mx-auto space-y-3">
                <div className="flex items-center justify-between border-b border-[#E2DBD0] pb-2">
                  <span className="text-xs uppercase tracking-wider text-[#7D7871]">
                    Service
                  </span>
                  <span className="font-serif text-lg text-[#1A1918] font-medium">
                    {confirmedBooking.serviceName}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E2DBD0] pb-2">
                  <span className="text-xs uppercase tracking-wider text-[#7D7871]">
                    Date & Time
                  </span>
                  <span className="font-mono text-sm text-[#1A1918] font-medium">
                    {confirmedBooking.date} · {confirmedBooking.time}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-[#E2DBD0] pb-2">
                  <span className="text-xs uppercase tracking-wider text-[#7D7871]">
                    Guest
                  </span>
                  <span className="text-sm text-[#1A1918]">
                    {confirmedBooking.clientName}
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#7D7871] block">
                    Salon Address
                  </span>
                  <p className="text-xs text-[#1A1918] font-medium">
                    {businessInfo.name} — {businessInfo.street}
                  </p>
                  <p className="text-xs text-[#7D7871]">
                    {businessInfo.postalCode} {businessInfo.city}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={downloadIcs}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#2C2A28] cursor-pointer"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <button
                  onClick={openGoogleCalendar}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#1A1918] text-[#1A1918] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#EFEAE1] cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Google Calendar</span>
                </button>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Oppenheimer+Landstra%C3%9Fe+63+60596+Frankfurt+am+Main+Germany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#1A1918] text-[#1A1918] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#EFEAE1] cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls (Steps 1-4) */}
        {step < 5 && (
          <div className="px-6 sm:px-8 py-4 bg-[#FAF7F2] border-t border-[#E8E2D5] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-medium text-[#7D7871] hover:text-[#1A1918] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                type="button"
                disabled={!selectedService}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#2C2A28] disabled:opacity-40 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 2 && (
              <button
                type="button"
                disabled={!selectedDate}
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#2C2A28] disabled:opacity-40 cursor-pointer"
              >
                <span>Choose Time</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 3 && (
              <button
                type="button"
                disabled={!selectedTime}
                onClick={() => setStep(4)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#2C2A28] disabled:opacity-40 cursor-pointer"
              >
                <span>Guest Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 4 && (
              <button
                type="button"
                onClick={() => {
                  if (validateCustomer()) {
                    handleConfirm();
                  }
                }}
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#2C2A28] cursor-pointer shadow-sm"
              >
                <span>Confirm Reservation</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Step 5 Done button */}
        {step === 5 && (
          <div className="px-6 sm:px-8 py-4 bg-[#FAF7F2] border-t border-[#E8E2D5] flex justify-center">
            <button
              onClick={handleModalClose}
              className="text-xs uppercase tracking-[0.2em] font-medium text-[#7D7871] hover:text-[#1A1918] cursor-pointer"
            >
              Done & Return to Website
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
