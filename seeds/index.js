const mongoose = require('mongoose');
const Hospital = require('../models/hospital');
const cities = require('./cities')

mongoose.connect('mongodb://localhost:27017/lifeline', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Hospital.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        // const price = Math.floor(Math.random() * 20) + 10;
        const hospital = new Hospital({
            author: "61388f3fe31d14ba76d08189",
            location: `${cities[random1000]}`,
            title: `hospital ${i + 1}`,
            // geometry: {
            //     "type": "Point",
            //     "coordinates": [
            //         cities[random1000].longitude,
            //         cities[random1000].latitude
            //     ]
            // },

            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam maxime hic quia. Molestiae, dolor veniam dolorum doloribus voluptatem dicta iste. Placeat blanditiis atque possimus ipsum voluptas ut libero enim fugiat?',
            url: 'https://google.com',
            facilities: ["Oncologist", "Cardiologist", "Dentist", "ENT", "Physician"],
            otime: "06:00",
            ctime: "23:59",
            geometry: {
                type: "Point",
                coordinates: [77.12, 28.38]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/storm123/image/upload/v1631201604/Hospitalo/hkjrzxo6tyikqnrw0clp.jpg',
                    filename: 'Hospitalo/hkjrzxo6tyikqnrw0clp',

                },
                {
                    url: 'https://res.cloudinary.com/storm123/image/upload/v1631201598/Hospitalo/q2hu91vdfeanmz8yi9dw.jpg',
                    filename: 'Hospitalo/q2hu91vdfeanmz8yi9dw',

                },
                {
                    url: 'https://res.cloudinary.com/storm123/image/upload/v1631201604/Hospitalo/sfaxvglwpzxtnc9gwueu.jpg',
                    filename: 'Hospitalo/sfaxvglwpzxtnc9gwueu',

                }
            ],
        })
        await hospital.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})