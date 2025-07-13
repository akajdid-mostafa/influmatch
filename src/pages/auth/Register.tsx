"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { User, Mail, Lock, Building, Globe, Sparkles, Eye, EyeOff, ArrowLeft, Check } from "lucide-react"
import TagInput from "../../components/ui/TagInput"
import SocialMediaInput from "../../components/ui/SocialMediaInput"

interface SocialPlatform {
  id: string
  platform: string
  followers: number
  profileLink: string
}

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState<"influencer" | "brand">("influencer")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    website: "",
  })

  const [niches, setNiches] = useState<string[]>([])
  const [sectors, setSectors] = useState<string[]>([])
  const [socialPlatforms, setSocialPlatforms] = useState<SocialPlatform[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const nichesSuggestions = [
    "Mode",
    "Beauté",
    "Tech",
    "Voyage",
    "Cuisine",
    "Sport",
    "Lifestyle",
    "Gaming",
    "Musique",
    "Art",
    "Photographie",
    "Fitness",
    "Santé",
  ]

  const sectorsSuggestions = [
    "Technologie",
    "Mode",
    "Beauté",
    "Alimentation",
    "Automobile",
    "Immobilier",
    "Finance",
    "Santé",
    "Éducation",
    "Divertissement",
  ]

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
    }

    if (!agreeToTerms) {
      newErrors.terms = "Vous devez accepter les conditions d'utilisation"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (userType === "brand") {
      if (!formData.company.trim()) {
        newErrors.company = "Le nom de l'entreprise est requis"
      }

      if (formData.website && !validateUrl(formData.website)) {
        newErrors.website = "URL du site web invalide"
      }

      if (sectors.length === 0) {
        newErrors.sectors = "Au moins un secteur d'activité est requis"
      }
    }

    if (userType === "influencer") {
      if (niches.length === 0) {
        newErrors.niches = "Au moins une niche est requise"
      }

      if (socialPlatforms.length === 0) {
        newErrors.socialPlatforms = "Au moins une plateforme sociale est requise"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handlePrevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateStep2()) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        console.log("Registration submitted:", {
          ...formData,
          userType,
          niches: userType === "influencer" ? niches : undefined,
          sectors: userType === "brand" ? sectors : undefined,
          socialPlatforms: userType === "influencer" ? socialPlatforms : undefined,
        })
        setIsLoading(false)
      }, 2000)
    }
  }

  const getHeroContent = () => {
    if (currentStep === 1) {
      return {
        title: "Rejoignez InfluMaroc",
        subtitle: "Créez votre compte et commencez à collaborer avec les meilleures marques et influenceurs du Maroc",
      }
    } else {
      return {
        title:
          userType === "influencer" ? "Complétez votre profil d'influenceur" : "Complétez votre profil d'entreprise",
        subtitle:
          userType === "influencer"
            ? "Ajoutez vos niches et plateformes sociales pour être découvert par les marques"
            : "Renseignez les détails de votre entreprise pour trouver les bons influenceurs",
      }
    }
  }

  const heroContent = getHeroContent()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[80vh] min-h-[700px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex h-full">
          {/* Left Section - Hero Image */}
          <div className="hidden lg:flex lg:w-1/2 relative">
            <div className="m-6 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-12 flex flex-col justify-between w-full">
              <div className="absolute inset-6 bg-black/20 rounded-3xl"></div>

              {/* Progress Indicator */}
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= 1 ? "bg-white text-purple-600" : "bg-white/30 text-white"
                    }`}
                  >
                    {currentStep > 1 ? <Check size={20} /> : <span className="font-bold">1</span>}
                  </div>
                  <div
                    className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                      currentStep >= 2 ? "bg-white" : "bg-white/30"
                    }`}
                  ></div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep >= 2 ? "bg-white text-purple-600" : "bg-white/30 text-white"
                    }`}
                  >
                    <span className="font-bold">2</span>
                  </div>
                </div>
                <div className="text-white/80 text-sm mb-2">Étape {currentStep} sur 2</div>
              </div>

              {/* Hero Content */}
              <div className="relative z-10 text-white">
                <h1 className="text-3xl xl:text-4xl font-bold mb-4 leading-tight">{heroContent.title}</h1>
                <p className="text-lg xl:text-xl opacity-90 mb-8 leading-relaxed">{heroContent.subtitle}</p>
                <div className="flex space-x-2">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      currentStep === 1 ? "w-8 bg-white" : "w-3 bg-white/60"
                    }`}
                  ></div>
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      currentStep === 2 ? "w-8 bg-white" : "w-3 bg-white/60"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Registration Form */}
          <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center overflow-y-auto">
            {/* Mobile Progress Indicator */}
            <div className="lg:hidden mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                    currentStep >= 1
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > 1 ? <Check size={16} /> : <span>1</span>}
                </div>
                <div
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                    currentStep >= 2 ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                    currentStep >= 2
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <span>2</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center">Étape {currentStep} sur 2</p>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={32} />
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {currentStep === 1 ? "Créer votre compte" : "Complétez votre profil"}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {currentStep === 1 ? "Commencez gratuitement" : "Quelques informations supplémentaires"}
              </p>
            </div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* User Type Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Je suis un(e) <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType("influencer")}
                      className={`p-4 rounded-2xl border-2 font-medium transition-all duration-200 text-sm sm:text-base ${
                        userType === "influencer"
                          ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">🎯</div>
                        <div>Influenceur</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType("brand")}
                      className={`p-4 rounded-2xl border-2 font-medium transition-all duration-200 text-sm sm:text-base ${
                        userType === "brand"
                          ? "border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">🏢</div>
                        <div>Marque</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base ${
                        errors.name ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Adresse email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base ${
                        errors.email ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="votre@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base ${
                        errors.password ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Minimum 6 caractères"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Confirmer le mot de passe <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-purple-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base ${
                        errors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      placeholder="Répétez votre mot de passe"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-2">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600 leading-relaxed">
                      J'accepte les{" "}
                      <a href="#" className="text-gradient hover:opacity-80 font-medium">
                        Conditions d'utilisation
                      </a>{" "}
                      et la{" "}
                      <a href="#" className="text-gradient hover:opacity-80 font-medium">
                        Politique de confidentialité
                      </a>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-red-500 text-sm flex items-center">
                      <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                      {errors.terms}
                    </p>
                  )}
                </div>

                {/* Continue Button */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-gradient w-full py-4 px-6 rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
                >
                  Continuer
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">ou</span>
                  </div>
                </div>

                {/* Google Sign Up */}
                <button
                  type="button"
                  className="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-medium hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  S'inscrire avec Google
                </button>
              </div>
            )}

            {/* Step 2: Profile Completion */}
            {currentStep === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Brand-specific fields */}
                {userType === "brand" && (
                  <>
                    {/* Company Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Nom de l'entreprise <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Building className="h-5 w-5 text-purple-400" />
                        </div>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base ${
                            errors.company ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                      {errors.company && (
                        <p className="text-red-500 text-sm flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {errors.company}
                        </p>
                      )}
                    </div>

                    {/* Website URL */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Site web de l'entreprise</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Globe className="h-5 w-5 text-purple-400" />
                        </div>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 text-sm sm:text-base ${
                            errors.website ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                          placeholder="https://votre-site.com"
                        />
                      </div>
                      {errors.website && (
                        <p className="text-red-500 text-sm flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {errors.website}
                        </p>
                      )}
                    </div>

                    {/* Sectors of Activity */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Secteurs d'activité <span className="text-red-500">*</span>
                      </label>
                      <TagInput
                        tags={sectors}
                        onTagsChange={setSectors}
                        suggestions={sectorsSuggestions}
                        placeholder="Ajouter un secteur d'activité"
                        maxTags={5}
                      />
                      {errors.sectors && (
                        <p className="text-red-500 text-sm flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {errors.sectors}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Influencer-specific fields */}
                {userType === "influencer" && (
                  <>
                    {/* Niches */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Vos niches <span className="text-red-500">*</span>
                      </label>
                      <TagInput
                        tags={niches}
                        onTagsChange={setNiches}
                        suggestions={nichesSuggestions}
                        placeholder="Ajouter une niche"
                        maxTags={5}
                      />
                      {errors.niches && (
                        <p className="text-red-500 text-sm flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {errors.niches}
                        </p>
                      )}
                    </div>

                    {/* Social Media Platforms - Enhanced Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-semibold text-gray-700">
                          Plateformes de réseaux sociaux <span className="text-red-500">*</span>
                        </label>
                        {socialPlatforms.length > 0 && (
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {socialPlatforms.length} plateforme{socialPlatforms.length > 1 ? "s" : ""} ajoutée
                            {socialPlatforms.length > 1 ? "s" : ""}
                          </div>
                        )}
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-100 rounded-2xl p-4">
                        <SocialMediaInput platforms={socialPlatforms} onPlatformsChange={setSocialPlatforms} />
                      </div>

                      {errors.socialPlatforms && (
                        <p className="text-red-500 text-sm flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {errors.socialPlatforms}
                        </p>
                      )}

                      {/* Helper Text */}
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                        <div className="flex items-start space-x-2">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="text-sm text-blue-700">
                            <p className="font-medium mb-1">Conseils pour vos plateformes :</p>
                            <ul className="text-xs space-y-1 text-blue-600">
                              <li>• Ajoutez vos plateformes principales avec le plus d'engagement</li>
                              <li>• Assurez-vous que vos liens de profil sont publics et accessibles</li>
                              <li>• Les marques pourront voir ces informations dans votre profil</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
                  >
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 btn-gradient py-4 px-6 rounded-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Création en cours...
                      </>
                    ) : (
                      <>
                        Créer mon compte
                        <Check className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm sm:text-base">
                Vous avez déjà un compte ?{" "}
                <Link to="/login" className="font-semibold text-gradient hover:opacity-80 transition-opacity">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
