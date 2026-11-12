import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, FaTimes, FaChevronDown, FaBalanceScale, 
  FaLightbulb, FaBookOpen, FaUsers, FaFeather, 
  FaBriefcase, FaHandshake, FaHistory, FaGavel, FaMicrophoneAlt, 
  FaHome, FaUserTie, FaUserGraduate, FaWhatsapp, FaCheckCircle, FaCalendarAlt
} from 'react-icons/fa';

export default function NavbarSecured({ theme, toggleTheme, isAuthenticated }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  
  // États pour le Modal de Prise de Rendez-vous
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'juridique',
    domaine: '',
    nom: '',
    telephone: '',
    date: '',
    message: ''
  });

  const navigate = useNavigate();

  // Menu réorganisé pour Avocate / Coach / Auteur (Sans lien Contact)
  const menuCategories = [
    {
      label: "Expertises",
      items: [
        { label: "About", href: "/about", icon: <FaLightbulb /> },
        { label: "Coaching Business", href: "/skills", icon: <FaUserTie /> },
        { label: "Techniques", href: "/services", icon: <FaGavel /> },
        { label: "Parcours", href: "/experience", icon: <FaHistory /> },
      ]
    },
    {
      label: "Impact & Publications",
      items: [
        { label: "Mon Accueil", href: "/", icon: <FaHome /> },
        { label: "Me Contacter", href: "/contact", icon: <FaHandshake /> },
      ]
    }
  ];

  const domainesJuridiques = [
    'Droit des Affaires & OHADA',
    'Droit du Travail & Social',
    'Droit Civil & Famille',
    'Conseil & Rédaction de Contrats',
    'Autre dossier juridique'
  ];

  const domainesMentorat = [
    'Coaching Entrepreneuriat Féminin',
    'Orientation Jeune Juriste / Étudiant',
    'Leadership & Prise de Parole',
    'Invitation Conférence / Panel'
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCategory = (label) => {
    setActiveCategory(activeCategory === label ? null : label);
  };

  const openBookingModal = () => {
    setIsOpen(false);
    setBookingStep(1);
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStep(2);
  };

  const sendToWhatsApp = () => {
    const phone = "243894400411"; // Remplacez par votre numéro WhatsApp Pro (sans le +)
    const motif = formData.type === 'juridique' ? 'Consultation Juridique' : 'Session Mentorat';
    const text = `Bonjour Maître Rebecca Kulufio,%0AJe souhaite réserver un rendez-vous :%0A- *Type :* ${motif}%0A- *Sujet :* ${formData.domaine}%0A- *Nom :* ${formData.nom}%0A- *Date souhaitée :* ${formData.date}%0A- *Détails :* ${formData.message}`;
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-slate-950/95 backdrop-blur-md py-3 shadow-2xl border-b border-white/5' : 'bg-slate-950/70 backdrop-blur-sm py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          
          {/* Logo Professionnel (Header) */}
          <div className="cursor-pointer group" onClick={() => navigate('/')}>
            <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.2em] uppercase italic">
              Reb<span className="text-amber-500 font-light not-italic">Kul</span>
            </span>
            <p className="text-[8px] tracking-[0.3em] uppercase text-slate-400 group-hover:text-white transition-colors">
              Avocate & Mentor
            </p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex gap-8 border-r border-slate-800 pr-8">
              {menuCategories.map((category) => (
                <div key={category.label} className="relative group py-2">
                  <button className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-300 group-hover:text-amber-400 transition-colors font-bold">
                    {category.label} <FaChevronDown size={8} className="group-hover:rotate-180 transition-transform" />
                  </button>
                  {/* Dropdown Style Luxe */}
                  <div className="absolute top-full left-0 mt-2 w-56 bg-slate-900 border border-amber-900/20 rounded-sm shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <div className="p-2">
                      {category.items.map((item) => (
                        <Link key={item.href} to={item.href} className="flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all border-b border-white/5 last:border-0">
                          <span className="text-amber-500">{item.icon}</span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bouton RDV ouvrant le Modal */}
            <button 
              onClick={openBookingModal} 
              className="text-[10px] uppercase tracking-widest bg-amber-600 hover:bg-amber-700 text-white px-6 py-2.5 font-bold transition-all shadow-lg shadow-amber-900/20 flex items-center gap-2"
            >
              <FaCalendarAlt size={11} />
              Prendre RDV
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden z-50 p-2 text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

       {/* Mobile Menu Overlay (Largeur réduite : w-72) */}
<AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          />

          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-screen w-72 bg-[#0a0a0a] shadow-2xl border-l border-neutral-800 z-50 flex flex-col justify-between md:hidden text-white overflow-y-auto"
          >
                <div className="flex flex-col px-6 py-20 gap-5">
                  <span className="text-[10px] tracking-[0.4em] uppercase text-amber-600 mb-2 font-bold">Explorer</span>
                  {menuCategories.map((category, idx) => (
                    <div key={category.label} className="w-full border-b border-white/5 pb-3">
                      <button onClick={() => toggleCategory(category.label)} className="flex items-center justify-between w-full py-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] font-mono text-amber-800">0{idx + 1}</span>
                          <p className={`text-lg font-serif ${activeCategory === category.label ? 'text-amber-400 italic' : 'text-slate-300'}`}>
                            {category.label}
                          </p>
                        </div>
                        <motion.div animate={{ rotate: activeCategory === category.label ? 180 : 0 }}>
                          <FaChevronDown size={12} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {activeCategory === category.label && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <div className="flex flex-col gap-3 pl-6 pt-3 pb-1">
                              {category.items.map((item) => (
                                <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-slate-300 hover:text-amber-400 transition-colors">
                                  <span className="text-amber-500 text-xs">{item.icon}</span> 
                                  <span className="text-xs uppercase tracking-wider">{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Bouton RDV dans le menu mobile */}
                  <button
                    onClick={openBookingModal}
                    className="mt-4 w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FaCalendarAlt size={12} />
                    Prendre RDV
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* MODAL DE PRISE DE RENDEZ-VOUS */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-slate-900 border border-amber-600/30 rounded-sm shadow-2xl overflow-hidden text-white"
            >
              {/* En-tête Modal */}
              <div className="px-6 py-5 bg-slate-950 border-b border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">
                    Cabinet Gombe & Accompagnement
                  </span>
                  <h3 className="text-xl font-serif font-bold">Prendre Rendez-vous</h3>
                </div>
                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {bookingStep === 1 ? (
                <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                  {/* Choix du pôle */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-2">
                      1. Objet de votre demande
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'juridique', domaine: '' })}
                        className={`p-3 rounded-sm border text-left flex flex-col gap-1.5 transition-all ${
                          formData.type === 'juridique'
                            ? 'bg-amber-600/20 border-amber-600 text-white'
                            : 'bg-slate-950/50 border-white/10 text-slate-400 hover:border-white/30'
                        }`}
                      >
                        <FaBalanceScale className="text-amber-500" size={18} />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Cabinet Avocat</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, type: 'mentorat', domaine: '' })}
                        className={`p-3 rounded-sm border text-left flex flex-col gap-1.5 transition-all ${
                          formData.type === 'mentorat'
                            ? 'bg-amber-600/20 border-amber-600 text-white'
                            : 'bg-slate-950/50 border-white/10 text-slate-400 hover:border-white/30'
                        }`}
                      >
                        <FaUserGraduate className="text-amber-500" size={18} />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Mentorat & Coaching</span>
                      </button>
                    </div>
                  </div>

                  {/* Sélection du domaine */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                      2. Domaine précis
                    </label>
                    <select
                      required
                      value={formData.domaine}
                      onChange={(e) => setFormData({ ...formData, domaine: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-white/15 rounded-sm text-sm text-white focus:border-amber-600 focus:outline-none"
                    >
                      <option value="">-- Sélectionnez un motif --</option>
                      {(formData.type === 'juridique' ? domainesJuridiques : domainesMentorat).map((item, idx) => (
                        <option key={idx} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  {/* Nom et Téléphone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Votre nom"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-950 border border-white/15 rounded-sm text-sm focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                        Téléphone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+243 ..."
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-950 border border-white/15 rounded-sm text-sm focus:border-amber-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Date souhaitée */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                      Date souhaitée (Cabinet Gombe ou En ligne)
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-white/15 rounded-sm text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  {/* Résumé bref */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-slate-400 mb-1.5">
                      Bref résumé de votre besoin
                    </label>
                    <textarea
                      rows="2"
                      placeholder="Décrivez brièvement l'objet de votre consultation..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-950 border border-white/15 rounded-sm text-sm focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase text-xs tracking-widest rounded-sm transition-all shadow-lg"
                  >
                    Confirmer la demande
                  </button>
                </form>
              ) : (
                /* Écran de confirmation */
                <div className="p-8 text-center space-y-5">
                  <FaCheckCircle className="text-amber-500 mx-auto" size={44} />
                  <h4 className="text-2xl font-serif font-bold">Demande enregistrée</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Merci <span className="text-white font-semibold">{formData.nom}</span>. Votre demande concernant le pôle <span className="text-amber-500 font-semibold">{formData.type === 'juridique' ? 'Juridique' : 'Mentorat'}</span> est prête.
                  </p>

                  <div className="pt-2 space-y-3">
                    <button
                      onClick={sendToWhatsApp}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-xs tracking-widest rounded-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <FaWhatsapp size={18} />
                      Envoyer directement via WhatsApp
                    </button>

                    <button
                      onClick={() => setIsBookingOpen(false)}
                      className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-widest rounded-sm transition-all"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
