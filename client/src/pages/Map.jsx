import { useEffect } from "react";
import { stationsMarkers } from "../constants/constants";

const Map = () => {
  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: { lat: 42.85472, lng: 27.90156 },
        zoom: 8,
        zoomControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER,
        },
        streetViewControlOptions: {
          position: window.google.maps.ControlPosition.LEFT_CENTER,
        },
        fullscreenControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_CENTER,
        },

      };

      // Create the map
      const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);


      const exitStreetViewBtn = document.createElement("button");
      exitStreetViewBtn.innerText = "Exit Street View";
      exitStreetViewBtn.style.cssText = `
        position: absolute;
        top: 90px;
        right: 10px;
        z-index: 999;
        background-color: #007bff;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        display: none; /* Hidden by default */
      `;
      
      document.body.appendChild(exitStreetViewBtn);

      const streetView = map.getStreetView();

      // Show Exit button when Street View is active
      streetView.addListener("visible_changed", () => {
        if (streetView.getVisible()) {
          exitStreetViewBtn.style.display = "block";
        } else {
          exitStreetViewBtn.style.display = "none";
        }
      });

      exitStreetViewBtn.addEventListener("click", () => {
        streetView.setVisible(false);
      });

      let activeInfoWindow = null;

      // Add markers and info windows for each station
      stationsMarkers.forEach((station) => {
        const marker = new window.google.maps.Marker({
          position: { lat: station.lat, lng: station.lng },
          map: map,
          title: station.name,
        });

        // Create an InfoWindow for the marker
        const infoWindow = new window.google.maps.InfoWindow({
            content: `
            <div style="font-family: Arial, sans-serif; max-width: 250px;">
              <h2 style="font-size: 18px; font-weight: bold; color: #333; margin-bottom: 8px;">${station.name}</h2>
              <p style="font-size: 14px; margin: 0; color: #666;">${station.address}</p>
              <hr style="margin: 8px 0; border: 0; border-top: 1px solid #ddd;" />
              <button 
                id="get-directions-${station.lat}-${station.lng}" 
                style="
                  display: inline-block;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  padding: 8px 12px;
                  font-size: 14px;
                  border-radius: 4px;
                  cursor: pointer;
                  text-align: center;
                  text-decoration: none;
                  width: 100%;
                  margin-top: 10px;
                  transition: background-color 0.3s ease;
                ">
                Open in Google Maps
              </button>
            </div>
          `,
        });


        marker.addListener("click", () => {
          if (activeInfoWindow) {
            activeInfoWindow.close();
          }

          if (activeInfoWindow !== infoWindow) {
            infoWindow.open(map, marker);
            activeInfoWindow = infoWindow;

            // Pan the map to ensure the marker and InfoWindow are fully visible
            map.panTo(marker.getPosition());

            setTimeout(() => {
              const directionsButton = document.getElementById(`get-directions-${station.lat}-${station.lng}`);
              directionsButton?.addEventListener("click", () => {
                window.open(`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`, "_blank");
              });
            }, 100);
          } else {
            activeInfoWindow = null;
          }
        });
      });
    };

    // Ensure the Google Maps API is loaded and then initialize the map
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(interval);
          initializeMap();
        }
      }, 100);
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default Map;
