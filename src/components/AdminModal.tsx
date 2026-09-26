import React, { useState } from 'react';
import { useSalon } from '../context/SalonContext.tsx';
import {
  X,
  Shield,
  Lock,
  Calendar,
  Scissors,
  Clock,
  Image as ImageIcon,
  Star,
  Users,
  Settings,
  Trash2,
  CheckCircle,
  Plus,
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    closeAdmin,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    appointments,
    updateAppointmentStatus,
    deleteAppointment,
    services,
    addService,
    deleteService,
    hours,
    updateHours,
    gallery,
    addGalleryPhoto,
    deleteGalleryPhoto,
    reviews,
    deleteReview,
    businessInfo,
  } = useSalon();

  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'bookings' | 'services' | 'hours' | 'gallery' | 'reviews' | 'customers' | 'settings'
  >('bookings');

  // New service form state
  const [newService, setNewService] = useState({
    name: '',
    category: 'HAIRCUT' as const,
    shortDescription: '',
    priceNote: 'Price on consultation',
    durationMinutes: 45,
    imageUrl: '/src/assets/images/service_precision_haircut_1790425617133.jpg',
  });

  // New gallery photo state
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Salon' as const,
    imageUrl: '/src/assets/images/hero_salon_frankfurt_1790425601819.jpg',
  });

  if (!isAdminOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pinInput);
    if (success) {
      setLoginError(false);
      setPinInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleAddServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.name.trim()) return;
    addService(newService);
    setNewService({
      name: '',
      category: 'HAIRCUT',
      shortDescription: '',
      priceNote: 'Price on consultation',
      durationMinutes: 45,
      imageUrl: '/src/assets/images/service_precision_haircut_1790425617133.jpg',
    });
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title.trim()) return;
    addGalleryPhoto(newPhoto);
    setNewPhoto({
      title: '',
      category: 'Salon',
      imageUrl: '/src/assets/images/hero_salon_frankfurt_1790425601819.jpg',
    });
  };

  // Extract unique customers from appointments
  const uniqueCustomers = Array.from(
    new Map(
      appointments.map((apt) => [
        apt.clientEmail,
        {
          name: apt.clientName,
          email: apt.clientEmail,
          phone: apt.clientPhone,
          totalVisits: appointments.filter((a) => a.clientEmail === apt.clientEmail).length,
        },
      ])
    ).values()
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF7F2] max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-[#E8E2D5] shadow-2xl">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#1A1918] text-[#FAF7F2] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#C5A880]" />
            <h2 className="font-serif text-xl tracking-wide uppercase">
              DER SALON · Management Portal
            </h2>
          </div>
          <button
            onClick={closeAdmin}
            className="p-1.5 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAdminLoggedIn ? (
          /* LOGIN GATE */
          <div className="p-10 sm:p-16 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-12 h-12 rounded-full bg-[#EFEAE1] border border-[#DCD6CA] flex items-center justify-center text-[#1A1918] mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-3xl text-[#1A1918] mb-2">Admin Authentication</h3>
            <p className="text-xs text-[#7D7871] max-w-sm mb-8">
              Enter salon management PIN (Default passcode: <span className="font-mono font-medium text-[#1A1918]">salon2026</span>)
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full max-w-xs space-y-4">
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN..."
                className="w-full px-4 py-3 bg-white border border-[#DCD6CA] text-center font-mono tracking-widest text-lg focus:outline-hidden focus:border-[#1A1918]"
              />
              {loginError && (
                <p className="text-xs text-red-600">Incorrect PIN. Try salon2026</p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2C2A28] cursor-pointer"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        ) : (
          /* DASHBOARD LAYOUT */
          <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 bg-[#F3EFE8] border-r border-[#E8E2D5] p-4 flex flex-row md:flex-col justify-between shrink-0 overflow-x-auto">
              <div className="flex md:flex-col gap-1 w-full">
                {[
                  { id: 'bookings', label: 'Bookings', icon: Calendar, count: appointments.length },
                  { id: 'services', label: 'Services', icon: Scissors, count: services.length },
                  { id: 'hours', label: 'Opening Hours', icon: Clock },
                  { id: 'gallery', label: 'Gallery', icon: ImageIcon, count: gallery.length },
                  { id: 'reviews', label: 'Reviews', icon: Star, count: reviews.length },
                  { id: 'customers', label: 'Customers', icon: Users, count: uniqueCustomers.length },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center justify-between px-4 py-3 text-xs uppercase tracking-[0.12em] font-medium transition-colors cursor-pointer w-full text-left ${
                        isActive
                          ? 'bg-[#1A1918] text-[#FAF7F2]'
                          : 'text-[#524F4A] hover:bg-[#EAE2D5] hover:text-[#1A1918]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </div>
                      {tab.count !== undefined && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-[#DCD6CA] text-[#1A1918]'
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:block pt-4 border-t border-[#E2DBD0]">
                <button
                  onClick={logoutAdmin}
                  className="w-full py-2.5 text-left px-4 text-xs uppercase tracking-wider text-red-700 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow p-6 sm:p-8 overflow-y-auto bg-[#FAF7F2]">
              {/* TAB 1: BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-[#1A1918]">Appointments Management</h3>
                      <p className="text-xs text-[#7D7871]">View and manage salon reservations</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-[#E8E2D5] bg-white">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F3EFE8] border-b border-[#E8E2D5] text-[11px] uppercase tracking-wider text-[#524F4A]">
                          <th className="p-3.5">Ref</th>
                          <th className="p-3.5">Date & Time</th>
                          <th className="p-3.5">Service</th>
                          <th className="p-3.5">Client</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E2D5] text-xs">
                        {appointments.map((apt) => (
                          <tr key={apt.id} className="hover:bg-[#FAF7F2]/50">
                            <td className="p-3.5 font-mono font-medium text-[#C5A880]">
                              {apt.referenceCode}
                            </td>
                            <td className="p-3.5 font-mono tabular-nums">
                              {apt.date} · {apt.time}
                            </td>
                            <td className="p-3.5 font-medium text-[#1A1918]">
                              {apt.serviceName}
                            </td>
                            <td className="p-3.5">
                              <div className="font-medium text-[#1A1918]">{apt.clientName}</div>
                              <div className="text-[11px] text-[#7D7871]">{apt.clientPhone}</div>
                            </td>
                            <td className="p-3.5">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 text-[10px] uppercase font-medium rounded-xs ${
                                  apt.status === 'confirmed'
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : apt.status === 'completed'
                                    ? 'bg-blue-50 text-blue-800'
                                    : 'bg-amber-50 text-amber-800'
                                }`}
                              >
                                {apt.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              {apt.status === 'confirmed' && (
                                <button
                                  onClick={() => updateAppointmentStatus(apt.id, 'completed')}
                                  title="Mark Completed"
                                  className="text-emerald-700 hover:underline text-[11px]"
                                >
                                  Complete
                                </button>
                              )}
                              <button
                                onClick={() => deleteAppointment(apt.id)}
                                title="Delete Booking"
                                className="text-red-600 hover:text-red-800 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-[#1A1918]">Services & Pricing</h3>
                      <p className="text-xs text-[#7D7871]">Add or modify salon service offerings</p>
                    </div>
                  </div>

                  {/* Add service form */}
                  <form onSubmit={handleAddServiceSubmit} className="p-5 bg-white border border-[#E8E2D5] space-y-4">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1918]">
                      Add New Service
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#7D7871] mb-1">Service Name</label>
                        <input
                          type="text"
                          required
                          value={newService.name}
                          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                          placeholder="e.g. Scalp Treatment"
                          className="w-full p-2 border border-[#DCD6CA] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#7D7871] mb-1">Category</label>
                        <select
                          value={newService.category}
                          onChange={(e) => setNewService({ ...newService, category: e.target.value as any })}
                          className="w-full p-2 border border-[#DCD6CA] text-xs bg-white"
                        >
                          <option value="HAIRCUT">HAIRCUT</option>
                          <option value="STYLING">STYLING</option>
                          <option value="HAIR CARE">HAIR CARE</option>
                          <option value="COLOUR">COLOUR</option>
                          <option value="KIDS">KIDS</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#7D7871] mb-1">Duration (Min)</label>
                        <input
                          type="number"
                          value={newService.durationMinutes}
                          onChange={(e) => setNewService({ ...newService, durationMinutes: Number(e.target.value) })}
                          className="w-full p-2 border border-[#DCD6CA] text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#7D7871] mb-1">Short Description</label>
                      <input
                        type="text"
                        value={newService.shortDescription}
                        onChange={(e) => setNewService({ ...newService, shortDescription: e.target.value })}
                        placeholder="Brief 1-sentence description"
                        className="w-full p-2 border border-[#DCD6CA] text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-wider"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Service</span>
                    </button>
                  </form>

                  {/* Services List */}
                  <div className="space-y-3">
                    {services.map((srv) => (
                      <div key={srv.id} className="p-4 bg-white border border-[#E8E2D5] flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-medium">
                            {srv.category} · {srv.durationMinutes} min
                          </span>
                          <h4 className="font-serif text-lg text-[#1A1918]">{srv.name}</h4>
                          <p className="text-xs text-[#7D7871]">{srv.shortDescription}</p>
                        </div>
                        <button
                          onClick={() => deleteService(srv.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: OPENING HOURS */}
              {activeTab === 'hours' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1A1918]">Opening Hours</h3>
                    <p className="text-xs text-[#7D7871]">Modify salon timetable per day</p>
                  </div>

                  <div className="space-y-3">
                    {hours.map((h) => (
                      <div key={h.day} className="p-4 bg-white border border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <span className="font-medium text-sm text-[#1A1918] w-32">{h.day}</span>
                        <div className="flex items-center gap-4 flex-grow">
                          <input
                            type="text"
                            value={h.hours}
                            onChange={(e) => updateHours(h.day, e.target.value, h.isClosed)}
                            className="p-2 border border-[#DCD6CA] text-xs font-mono w-40"
                          />
                          <label className="flex items-center gap-2 text-xs text-[#7D7871] cursor-pointer">
                            <input
                              type="checkbox"
                              checked={h.isClosed}
                              onChange={(e) => updateHours(h.day, e.target.checked ? 'Closed' : '10:00–19:00', e.target.checked)}
                            />
                            <span>Closed all day</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1A1918]">Gallery Management</h3>
                    <p className="text-xs text-[#7D7871]">Add or remove photography items</p>
                  </div>

                  {/* Add photo form */}
                  <form onSubmit={handleAddPhotoSubmit} className="p-5 bg-white border border-[#E8E2D5] space-y-4">
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1A1918]">
                      Add Gallery Image
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#7D7871] mb-1">Title</label>
                        <input
                          type="text"
                          required
                          value={newPhoto.title}
                          onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                          placeholder="e.g. Modern Styling Suite"
                          className="w-full p-2 border border-[#DCD6CA] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#7D7871] mb-1">Category</label>
                        <select
                          value={newPhoto.category}
                          onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value as any })}
                          className="w-full p-2 border border-[#DCD6CA] text-xs bg-white"
                        >
                          <option value="Salon">Salon</option>
                          <option value="Hair">Hair</option>
                          <option value="Styling">Styling</option>
                          <option value="Team">Team</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1918] text-[#FAF7F2] text-xs uppercase tracking-wider"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Photo</span>
                    </button>
                  </form>

                  {/* Gallery Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {gallery.map((photo) => (
                      <div key={photo.id} className="relative group bg-white border border-[#E8E2D5] p-2">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          referrerPolicy="no-referrer"
                          className="w-full aspect-[4/3] object-cover mb-2"
                        />
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium truncate">{photo.title}</span>
                          <button
                            onClick={() => deleteGalleryPhoto(photo.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1A1918]">Testimonials & Reviews</h3>
                    <p className="text-xs text-[#7D7871]">Manage authentic Google client feedback</p>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-4 bg-white border border-[#E8E2D5] flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-xs text-[#1A1918]">{rev.author}</span>
                            <span className="text-[10px] text-[#C5A880]">★ {rev.rating}</span>
                          </div>
                          <p className="font-serif italic text-sm text-[#524F4A]">“{rev.quote}”</p>
                        </div>
                        <button
                          onClick={() => deleteReview(rev.id)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: CUSTOMERS */}
              {activeTab === 'customers' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1A1918]">Client Accounts</h3>
                    <p className="text-xs text-[#7D7871]">Clients who have booked appointments</p>
                  </div>

                  <div className="overflow-x-auto border border-[#E8E2D5] bg-white">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F3EFE8] border-b border-[#E8E2D5] text-[11px] uppercase tracking-wider text-[#524F4A]">
                          <th className="p-3.5">Client Name</th>
                          <th className="p-3.5">Email</th>
                          <th className="p-3.5">Phone</th>
                          <th className="p-3.5">Total Bookings</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E2D5] text-xs">
                        {uniqueCustomers.map((c) => (
                          <tr key={c.email} className="hover:bg-[#FAF7F2]/50">
                            <td className="p-3.5 font-medium text-[#1A1918]">{c.name}</td>
                            <td className="p-3.5 text-[#524F4A]">{c.email}</td>
                            <td className="p-3.5 font-mono">{c.phone}</td>
                            <td className="p-3.5 font-mono">{c.totalVisits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 7: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1A1918]">Business Settings</h3>
                    <p className="text-xs text-[#7D7871]">Salon configuration & contact information</p>
                  </div>

                  <div className="p-6 bg-white border border-[#E8E2D5] space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-medium text-[#1A1918] mb-1">Salon Name</label>
                      <input type="text" disabled value={businessInfo.name} className="w-full p-2.5 bg-[#F6F2EB] border border-[#DCD6CA] text-xs font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1A1918] mb-1">Street Address</label>
                      <input type="text" disabled value={businessInfo.street} className="w-full p-2.5 bg-[#F6F2EB] border border-[#DCD6CA] text-xs font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#1A1918] mb-1">Postal Code</label>
                        <input type="text" disabled value={businessInfo.postalCode} className="w-full p-2.5 bg-[#F6F2EB] border border-[#DCD6CA] text-xs font-mono" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#1A1918] mb-1">City</label>
                        <input type="text" disabled value={businessInfo.city} className="w-full p-2.5 bg-[#F6F2EB] border border-[#DCD6CA] text-xs font-mono" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#1A1918] mb-1">Telephone</label>
                      <input type="text" disabled value={businessInfo.phoneDisplay} className="w-full p-2.5 bg-[#F6F2EB] border border-[#DCD6CA] text-xs font-mono" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
