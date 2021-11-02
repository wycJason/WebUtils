"use strict";

window.GolfClub = window.GolfClub || {};

GolfClub.dataUrl = "https://js.devexpress.com/Demos/GolfClub/odata/";

GolfClub.stores = {
    cities: new DevExpress.data.ODataStore({
        url: GolfClub.dataUrl + "Cities",
        key: "Id",
        keyType: "Int32"
    }),
    clubs: new DevExpress.data.ODataStore({
        url: GolfClub.dataUrl + "Clubs",
        key: "Id",
        keyType: "Int32"
    }),
    offerOfTheDay: new DevExpress.data.ODataStore({
        url: GolfClub.dataUrl + "Clubs/OfferOfTheDay",
        beforeSend: function (e) {
            e.method = "POST";
        }
    })
};
