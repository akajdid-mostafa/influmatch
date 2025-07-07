import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Search,
  Star,
  Users,
  MessageSquare,
  Instagram,
  Youtube,
  GitBranch as BrandTiktok,
  Target,
  Award,
} from "lucide-react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { InfluencerProfile } from "../../types";

const FindInfluencers = () => {
  useAuth();
  const [loading, setLoading] = useState(true);
  const [influencers, setInfluencers] = useState<InfluencerProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNiches, setSelectedNiches] = useState<string[]>([]);
  const [minFollowers, setMinFollowers] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const moroccanNiches = [
    "Mode",
    "Beauté",
    "Lifestyle",
    "Tech",
    "Gaming",
    "Cuisine Marocaine",
    "Voyage",
    "Fitness",
    "Business",
    "Art et Artisanat",
    "Culture Marocaine",
    "Musique",
    "Comédie",
    "Sport"
  ];

  const platforms = [
    { id: "instagram", name: "Instagram", icon: Instagram },
    { id: "youtube", name: "YouTube", icon: Youtube },
    { id: "tiktok", name: "TikTok", icon: BrandTiktok },
  ];

  useEffect(() => {
    // Simulate API call to fetch influencers
    const fetchInfluencers = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock data for Moroccan influencers
        const mockInfluencers: InfluencerProfile[] = [
          {
            id: 1,
            name: "Saad Lamjarred",
            email: "contact.saadlamjarred@example.com",
            role: "influencer",
            profileImage: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "Artiste marocain international | Chanteur et compositeur 🎵",
            niche: ["Musique", "Divertissement", "Culture Marocaine"],
            location: "Rabat, Maroc",
            followers: {
              instagram: 8500000,
              youtube: 12000000,
            },
            engagementRate: 6.8,
            averageRating: 4.9,
          },
          {
            id: 2,
            name: "Dounia Batma",
            email: "contact.douniabatma@example.com",
            role: "influencer",
            profileImage: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "Chanteuse marocaine | Actrice | Ambassadrice de la mode 👗",
            niche: ["Mode", "Beauté", "Musique", "Lifestyle"],
            location: "Casablanca, Maroc",
            followers: {
              instagram: 3200000,
              youtube: 1800000,
            },
            engagementRate: 5.4,
            averageRating: 4.8,
          },
          {
            id: 3,
            name: "Amine Aouni",
            email: "contact.amineaouni@example.com",
            role: "influencer",
            profileImage: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "Acteur et créateur de contenu marocain | Comédie et divertissement 😄",
            niche: ["Comédie", "Divertissement", "Acting"],
            location: "Casablanca, Maroc",
            followers: {
              instagram: 870000,
              tiktok: 1200000,
            },
            engagementRate: 7.2,
            averageRating: 4.7,
          },
          {
            id: 4,
            name: "Lalla Hizia",
            email: "contact.lallahizia@example.com",
            role: "influencer",
            profileImage: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "Chef cuisinière spécialisée en cuisine marocaine traditionnelle 🍽️",
            niche: ["Cuisine Marocaine", "Lifestyle", "Culture Marocaine"],
            location: "Fès, Maroc",
            followers: {
              instagram: 450000,
              youtube: 680000,
              tiktok: 320000,
            },
            engagementRate: 8.1,
            averageRating: 4.9,
          },
          {
            id: 5,
            name: "Youssef Hajji",
            email: "contact.youssefhajji@example.com",
            role: "influencer",
            profileImage: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "Entrepreneur tech marocain | Fondateur de startups | Innovation 💡",
            niche: ["Tech", "Business", "Innovation"],
            location: "Rabat, Maroc",
            followers: {
              instagram: 280000,
              youtube: 150000,
            },
            engagementRate: 4.8,
            averageRating: 4.6,
          },
          {
            id: 6,
            name: "Aicha Tachinouite",
            email: "contact.aichatachinouite@example.com",
            role: "influencer",
            profileImage: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "Chanteuse amazighe | Ambassadrice de la culture berbère 🎶",
            niche: ["Musique", "Culture Marocaine", "Art et Artisanat"],
            location: "Agadir, Maroc",
            followers: {
              instagram: 520000,
              youtube: 890000,
            },
            engagementRate: 6.2,
            averageRating: 4.8,
          },
          {
            id: 7,
            name: "Mehdi K-Libre",
            email: "contact.mehdiklibre@example.com",
            role: "influencer",
            profileImage: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "Rappeur marocain | Producteur musical | Street culture 🎤",
            niche: ["Musique", "Culture Urbaine", "Lifestyle"],
            location: "Casablanca, Maroc",
            followers: {
              instagram: 1200000,
              youtube: 2100000,
              tiktok: 800000,
            },
            engagementRate: 7.5,
            averageRating: 4.7,
          },
          {
            id: 8,
            name: "Fatima Zahra Bennacer",
            email: "contact.fatimazahra@example.com",
            role: "influencer",
            profileImage: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            bio: "Experte beauté et cosmétiques naturels | Produits du terroir marocain 💄",
            niche: ["Beauté", "Produits Naturels", "Lifestyle"],
            location: "Marrakech, Maroc",
            followers: {
              instagram: 650000,
              tiktok: 420000,
            },
            engagementRate: 5.9,
            averageRating: 4.8,
          },
        ];

        setInfluencers(mockInfluencers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching influencers:", error);
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  const handleNicheToggle = (niche: string) => {
    setSelectedNiches((prev) =>
      prev.includes(niche) ? prev.filter((n) => n !== niche) : [...prev, niche]
    );
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchesSearch =
      influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      influencer.bio?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesNiches =
      selectedNiches.length === 0 ||
      selectedNiches.some((niche) =>
        influencer.niche
          ?.map((n) => n.toLowerCase())
          .includes(niche.toLowerCase())
      );

    const matchesPlatforms =
      selectedPlatforms.length === 0 ||
      selectedPlatforms.some(
        (platform) =>
          influencer.followers?.[platform as keyof typeof influencer.followers]
      );

    const matchesFollowers =
      !minFollowers ||
      Object.values(influencer.followers || {}).some(
        (count) => Number(count) >= parseInt(minFollowers)
      );

    return (
      matchesSearch && matchesNiches && matchesPlatforms && matchesFollowers
    );
  });

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 page-transition">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl mr-6 float-animation">
              <Target className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 text-shadow">
                Trouver des <span className="text-gradient">Influenceurs</span>
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Découvrez les créateurs parfaits pour votre marque au Maroc
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="card-modern p-8">
        <div className="space-y-8">
          {/* Search */}
          <div className="input-group">
            <label htmlFor="search" className="input-label">
              Rechercher des influenceurs
            </label>
            <div className="search-modern">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="w-full pl-14 pr-4 py-4 bg-white/90 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-transparent backdrop-blur-10px transition-all duration-300"
                placeholder="Rechercher par nom ou bio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Niches */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Niches de Contenu
            </h3>
            <div className="flex flex-wrap gap-3">
              {moroccanNiches.map((niche, index) => (
                <button
                  key={niche}
                  onClick={() => handleNicheToggle(niche)}
                  className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedNiches.includes(niche)
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {niche}
                </button>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Plateformes</h3>
            <div className="flex flex-wrap gap-4">
              {platforms.map((platform, index) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformToggle(platform.id)}
                  className={`inline-flex items-center px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    selectedPlatforms.includes(platform.id)
                      ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <platform.icon className="h-5 w-5 mr-2" />
                  {platform.name}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Followers */}
          <div className="input-group">
            <label htmlFor="minFollowers" className="input-label">
              Nombre minimum d'abonnés
            </label>
            <input
              type="number"
              id="minFollowers"
              className="input-modern"
              placeholder="ex: 10000"
              value={minFollowers}
              onChange={(e) => setMinFollowers(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Influencers Grid */}
      <div className="card-modern">
        <div className="px-8 py-6 border-b border-gray-100/50">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg mr-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Découvrir les Créateurs
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filteredInfluencers.length} influenceur
                {filteredInfluencers.length !== 1 ? "s" : ""} trouvé
                {filteredInfluencers.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredInfluencers.map((influencer, index) => (
              <div
                key={influencer.id}
                className="card-modern p-8 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-6">
                  <div className="avatar-story">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-lg">
                      {influencer.profileImage ? (
                        <img
                          className="w-full h-full object-cover"
                          src={influencer.profileImage}
                          alt={influencer.name}
                        />
                      ) : (
                        <Users className="h-10 w-10 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="ml-6 flex-1">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {influencer.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {influencer.bio}
                    </p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold text-gray-700">
                        {influencer.averageRating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-purple-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="font-bold">
                        {Object.values(influencer.followers || {})
                          .reduce((a, b) => Number(a) + Number(b), 0)
                          .toLocaleString()}{" "}
                        abonnés
                      </span>
                    </div>
                    <div className="flex items-center text-green-600">
                      <span className="font-bold">
                        {influencer.engagementRate}% engagement
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(influencer.followers || {}).map(
                      ([platform, count]) => (
                        <div
                          key={platform}
                          className="bg-gray-50 p-2 rounded-xl text-center"
                        >
                          <p className="font-bold text-gray-900">
                            {Number(count) >= 1000000 
                              ? `${(Number(count) / 1000000).toFixed(1)}M`
                              : `${(Number(count) / 1000).toFixed(0)}K`}
                          </p>
                          <p className="text-gray-500 capitalize">{platform}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {influencer.niche?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="btn-primary text-sm px-6 py-3 group-hover:scale-105 transition-transform duration-300">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindInfluencers;