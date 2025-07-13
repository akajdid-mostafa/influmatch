"use client"

import type React from "react"
import { useState } from "react"
import {
  Plus,
  Trash2,
  Instagram,
  Youtube,
  TwitterIcon as TikTok,
  Globe,
  ExternalLink,
  Users,
  Check,
  X,
} from "lucide-react"

interface SocialMediaPlatform {
  id: string
  platform: string
  followers: number
  profileLink: string
}

interface SocialMediaInputProps {
  platforms: SocialMediaPlatform[]
  onPlatformsChange: (platforms: SocialMediaPlatform[]) => void
  className?: string
}

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({ platforms, onPlatformsChange, className = "" }) => {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPlatform, setNewPlatform] = useState<SocialMediaPlatform>({
    id: "",
    platform: "",
    followers: 0,
    profileLink: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const platformOptions = [
    {
      value: "instagram",
      label: "Instagram",
      icon: Instagram,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      placeholder: "https://instagram.com/votre-nom",
    },
    {
      value: "youtube",
      label: "YouTube",
      icon: Youtube,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      placeholder: "https://youtube.com/@votre-chaine",
    },
    {
      value: "tiktok",
      label: "TikTok",
      icon: TikTok,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      placeholder: "https://tiktok.com/@votre-nom",
    },
    {
      value: "facebook",
      label: "Facebook",
      icon: Globe,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      placeholder: "https://facebook.com/votre-page",
    },
    {
      value: "twitter",
      label: "Twitter/X",
      icon: Globe,
      color: "text-gray-900",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      placeholder: "https://twitter.com/votre-nom",
    },
    {
      value: "linkedin",
      label: "LinkedIn",
      icon: Globe,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      placeholder: "https://linkedin.com/in/votre-profil",
    },
    {
      value: "autre",
      label: "Autre plateforme",
      icon: Globe,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      placeholder: "https://votre-plateforme.com",
    },
  ]

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const validateNewPlatform = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!newPlatform.platform) {
      newErrors.platform = "Sélectionnez une plateforme"
    }

    if (!newPlatform.profileLink) {
      newErrors.profileLink = "Le lien du profil est requis"
    } else if (!validateUrl(newPlatform.profileLink)) {
      newErrors.profileLink = "Veuillez entrer une URL valide"
    }

    if (!newPlatform.followers || newPlatform.followers < 0) {
      newErrors.followers = "Le nombre d'abonnés est requis"
    }

    // Check if platform already exists
    if (newPlatform.platform && platforms.some((p) => p.platform === newPlatform.platform)) {
      newErrors.platform = "Cette plateforme est déjà ajoutée"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddPlatform = () => {
    if (validateNewPlatform()) {
      const platformToAdd = {
        ...newPlatform,
        id: Date.now().toString(),
      }
      onPlatformsChange([...platforms, platformToAdd])
      setNewPlatform({ id: "", platform: "", followers: 0, profileLink: "" })
      setShowAddForm(false)
      setErrors({})
    }
  }

  const handleCancelAdd = () => {
    setNewPlatform({ id: "", platform: "", followers: 0, profileLink: "" })
    setShowAddForm(false)
    setErrors({})
  }

  const removePlatform = (id: string) => {
    onPlatformsChange(platforms.filter((p) => p.id !== id))
  }

  const getPlatformConfig = (platformValue: string) => {
    return platformOptions.find((p) => p.value === platformValue) || platformOptions[platformOptions.length - 1]
  }

  const formatFollowers = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  return (
    <div className={className}>
      {/* Existing Platforms */}
      {platforms.length > 0 && (
        <div className="space-y-3 mb-6">
          {platforms.map((platform) => {
            const config = getPlatformConfig(platform.platform)
            const IconComponent = config.icon

            return (
              <div
                key={platform.id}
                className={`group relative p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-md ${config.bgColor} ${config.borderColor}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`p-2 rounded-xl bg-white shadow-sm ${config.borderColor} border`}>
                      <IconComponent className={`h-6 w-6 ${config.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{config.label}</h3>
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span className="text-sm font-medium">{formatFollowers(platform.followers)}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <a
                          href={platform.profileLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-600 hover:text-purple-600 transition-colors truncate flex items-center space-x-1 group"
                        >
                          <span className="truncate">{platform.profileLink}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removePlatform(platform.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add New Platform Form */}
      {showAddForm && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-6 mb-4 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Plus className="h-5 w-5 mr-2 text-purple-600" />
              Ajouter une plateforme
            </h3>
          </div>

          {/* Platform Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Plateforme <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {platformOptions.map((option) => {
                const IconComponent = option.icon
                const isSelected = newPlatform.platform === option.value
                const isDisabled = platforms.some((p) => p.platform === option.value)

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => !isDisabled && setNewPlatform((prev) => ({ ...prev, platform: option.value }))}
                    disabled={isDisabled}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 text-center relative ${
                      isDisabled
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : isSelected
                          ? `${option.bgColor} ${option.borderColor} shadow-md`
                          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    {isDisabled && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <IconComponent className={`h-6 w-6 mx-auto mb-2 ${isDisabled ? "text-gray-400" : option.color}`} />
                    <div className={`text-xs font-medium ${isDisabled ? "text-gray-400" : "text-gray-700"}`}>
                      {option.label}
                    </div>
                  </button>
                )
              })}
            </div>
            {errors.platform && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.platform}
              </p>
            )}
          </div>

          {/* Profile Link */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Lien du profil <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type="url"
                value={newPlatform.profileLink}
                onChange={(e) => setNewPlatform((prev) => ({ ...prev, profileLink: e.target.value }))}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                  errors.profileLink ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder={newPlatform.platform ? getPlatformConfig(newPlatform.platform).placeholder : "https://..."}
              />
            </div>
            {errors.profileLink && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.profileLink}
              </p>
            )}
          </div>

          {/* Followers Count */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Nombre d'abonnés <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-purple-400" />
              </div>
              <input
                type="number"
                min="0"
                value={newPlatform.followers || ""}
                onChange={(e) =>
                  setNewPlatform((prev) => ({ ...prev, followers: Number.parseInt(e.target.value) || 0 }))
                }
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
                  errors.followers ? "border-red-300 bg-red-50" : "border-gray-200 hover:border-gray-300"
                }`}
                placeholder="ex: 10000"
              />
            </div>
            {errors.followers && (
              <p className="text-red-500 text-sm flex items-center">
                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                {errors.followers}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={handleCancelAdd}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 flex items-center justify-center"
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </button>
            <button
              type="button"
              onClick={handleAddPlatform}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center"
            >
              <Check className="h-4 w-4 mr-2" />
              Ajouter
            </button>
          </div>
        </div>
      )}

      {/* Add Platform Button */}
      {!showAddForm && (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="w-full flex items-center justify-center px-6 py-4 border-2 border-dashed border-purple-300 rounded-2xl text-purple-600 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200 group"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
          <span className="font-medium">Ajouter une plateforme sociale</span>
        </button>
      )}

      {/* Empty State */}
      {platforms.length === 0 && !showAddForm && (
        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune plateforme ajoutée</h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">
            Ajoutez vos plateformes de réseaux sociaux pour que les marques puissent découvrir votre audience
          </p>
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Commencer
          </button>
        </div>
      )}
    </div>
  )
}

export default SocialMediaInput
