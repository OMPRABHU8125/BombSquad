import { Users, MapPin, Clock } from "lucide-react";
import { communityScans } from "@/data/communityMock";
import TranslateButton from "@/components/common/TranslateButton";

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-green-600" />
            <h1 className="text-xl font-bold">Community Scans</h1>
          </div>
          <TranslateButton />
        </div>
      </header>

      {/* Feed */}
      <main className="max-w-4xl mx-auto p-4 space-y-4">
        {communityScans.map((scan) => (
          <div key={scan.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">{scan.farmerName}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {scan.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {scan.timeAgo}
                    </span>
                  </div>
                </div>
              </div>

              <img 
                src={scan.imageUrl} 
                alt={scan.crop}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />

              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <p className="text-sm text-gray-600">Detected Disease</p>
                <p className="font-bold text-lg">{scan.disease}</p>
                <p className="text-sm text-gray-500">in {scan.crop}</p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Community;