import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LiveMapProps {
  runnerPosition: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  origin?: { lat: number; lng: number };
  routePoints?: Array<{ lat: number; lng: number }>;
  runnerName?: string;
  destinationLabel?: string;
  originLabel?: string;
  runnerIcon?: string;
  destinationIcon?: string;
  height?: string;
  showRoute?: boolean;
}

export default function LiveMap({
  runnerPosition,
  destination,
  origin,
  routePoints,
  runnerName = '跑者',
  destinationLabel = '目的地',
  originLabel = '起點',
  runnerIcon = '🛵',
  destinationIcon = '📍',
  height = '400px',
  showRoute = true,
}: LiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const runnerMarkerRef = useRef<L.Marker | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [eta, setEta] = useState<number>(0);

  // 計算距離（Haversine formula）
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // 地球半徑（公里）
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (!mapRef.current) return;
    
    // 如果地圖已經存在，先清理
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // 初始化地圖
    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([runnerPosition.lat, runnerPosition.lng], 14);

    // 添加地圖圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // 添加縮放控制
    L.control.zoom({ position: 'topright' }).addTo(map);

    // 添加起點標記
    if (origin) {
      const originIcon = L.divIcon({
        html: `<div style="background: white; border: 3px solid #6366f1; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">🏠</div>`,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      L.marker([origin.lat, origin.lng], { icon: originIcon })
        .addTo(map)
        .bindPopup(`<b>${originLabel}</b>`);
    }

    // 添加目的地標記
    const destIcon = L.divIcon({
      html: `<div style="background: white; border: 3px solid #10b981; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">${destinationIcon}</div>`,
      className: 'custom-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });

    L.marker([destination.lat, destination.lng], { icon: destIcon })
      .addTo(map)
      .bindPopup(`<b>${destinationLabel}</b>`);

    // 添加跑者標記
    const runnerIconObj = L.divIcon({
      html: `
        <div style="position: relative;">
          <div style="position: absolute; inset: -8px; background: rgba(99, 102, 241, 0.3); border-radius: 50%; animation: pulse 2s infinite;"></div>
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); border: 3px solid white; border-radius: 50%; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; font-size: 24px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4); position: relative;">${runnerIcon}</div>
          <div style="position: absolute; top: 52px; left: 50%; transform: translateX(-50%); background: #6366f1; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${runnerName}</div>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    runnerMarkerRef.current = L.marker([runnerPosition.lat, runnerPosition.lng], {
      icon: runnerIconObj,
    }).addTo(map);

    // 添加路線
    if (showRoute && routePoints && routePoints.length > 0) {
      const routeLine = L.polyline(routePoints, {
        color: '#6366f1',
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10',
      }).addTo(map);

      // 添加動畫效果
      let offset = 0;
      const animateRoute = () => {
        offset -= 1;
        routeLine.setStyle({ dashOffset: String(offset) });
        requestAnimationFrame(animateRoute);
      };
      animateRoute();
    }

    // 調整視圖以顯示所有標記
    const bounds = L.latLngBounds([
      [runnerPosition.lat, runnerPosition.lng],
      [destination.lat, destination.lng],
    ]);
    if (origin) {
      bounds.extend([origin.lat, origin.lng]);
    }
    map.fitBounds(bounds, { padding: [50, 50] });

    mapInstanceRef.current = map;

    // 清理
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // 更新跑者位置
  useEffect(() => {
    if (runnerMarkerRef.current) {
      runnerMarkerRef.current.setLatLng([runnerPosition.lat, runnerPosition.lng]);
      
      // 計算距離和 ETA
      const dist = calculateDistance(
        runnerPosition.lat,
        runnerPosition.lng,
        destination.lat,
        destination.lng
      );
      setDistance(dist);
      
      // 假設平均速度 30 km/h（機車）
      const etaMinutes = (dist / 30) * 60;
      setEta(Math.ceil(etaMinutes));
    }
  }, [runnerPosition, destination]);

  return (
    <div className="relative">
      <div ref={mapRef} style={{ height, width: '100%', borderRadius: '16px', zIndex: 1 }} />
      
      {/* 資訊卡片 */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200 z-[1000]">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-gray-600 font-medium">跑者</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-gray-600 font-medium">目的地</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-0.5 bg-indigo-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #6366f1 0, #6366f1 4px, transparent 4px, transparent 8px)' }} />
            <span className="text-gray-600 font-medium">路線</span>
          </div>
        </div>
      </div>

      {/* 即時資訊 */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200 z-[1000]">
        <div className="space-y-2 text-xs">
          <div>
            <span className="text-gray-500">距離：</span>
            <span className="font-bold text-indigo-600">{distance.toFixed(2)} 公里</span>
          </div>
          <div>
            <span className="text-gray-500">預計到達：</span>
            <span className="font-bold text-green-600">{eta} 分鐘</span>
          </div>
        </div>
      </div>

      {/* CSS 動畫 */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .custom-marker {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
}
