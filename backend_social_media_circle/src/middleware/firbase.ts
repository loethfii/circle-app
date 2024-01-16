// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default new (class firebaseConf {
  public firebaseConfig = {
    apiKey: "AIzaSyBRARlbjDRQE-Oywy0cV3oTUJhafM5ha_A",
    authDomain: "yang-ini-aja.firebaseapp.com",
    projectId: "yang-ini-aja",
    storageBucket: "yang-ini-aja.appspot.com",
    messagingSenderId: "947503507330",
    appId: "1:947503507330:web:79125c3dc414ba2019519b",
    measurementId: "G-9JELR17ZNT",
  };

  // Initialize Firebase
  public app = initializeApp(this.firebaseConfig);
  public analytics = getAnalytics(this.app);
})();
