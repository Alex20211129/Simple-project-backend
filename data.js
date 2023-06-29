import dotenv from 'dotenv'
dotenv.config()

const data = {
    category: [
        {
            _id: '1',
            name: "工業用潤滑油",
            image: "/images/p1.jpg",
            url: "IndustrialLubricants"
        },
        {
            _id: '2',
            name: "車用齒輪油",
            image: "/images/AutomotiveLubricants.jpg",
            url: "AutomotiveLubricants"
        },
        {
            _id: '3',
            name: "船舶用潤滑油",
            image: "/images/MarineLubrication.jpg",
            url: "MarineLubrication"
        },
        {
            _id: '4',
            name: "食品機械用油",
            image: "/images/FoodMachineryOil.jpg",
            url: "FoodMachineryOil"
        },
        {
            _id: '5',
            name: "金屬加工油",
            image: "/images/MetalProcessingOil.jpg",
            url: "MetalProcessingOil"
        },
        {
            _id: '6',
            name: "潤滑油脂",
            image: "/images/Grease.jpg",
            url: "Grease"
        },
    
    ],
    products: [
        {
            name: 'super hyrando 32',
            chname:"高級抗磨耗油壓作動油",
            category: 'IndustrialLubricants',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/SuperHyrando38.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'GEAR oil GL-5',
            chname:"車用齒輪油",
            category: 'AutomotiveLubricants',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/GEAROILGL-5.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'GL-6 90',
            chname:"LSD專用齒輪油",
            category: 'AutomotiveLubricants',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/LSDGL-6%2090.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'ENEOS ECO AT FLUID',
            chname:"自動變速箱油",
            category: 'AutomotiveLubricants',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/ENEOSECO%20AT%20FLUID.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'marine f 40',
            chname:"漁船、救生艇用柴油引擎用油 ",
            category: 'MarineLubrication',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/MarineF40.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'antirust terami sc',
            chname:"防銹油 ",
            category: 'MetalProcessingOil',   
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/AntirustTeramiSC.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'super hyrando 68',
            chname:"高級抗磨耗油壓作動油",
            category: 'IndustrialLubricants',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/noImage.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'super hyrando 46',
            chname:"高級抗磨耗油壓作動油",
            category: 'IndustrialLubricants',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/noImage.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'super hyrando 1',
            chname:"高級抗磨耗油壓作動油",
            category: 'IndustrialLubricants',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/noImage.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'super hyrando 2',
            chname:"高級抗磨耗油壓作動油",
            category: 'IndustrialLubricants',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/noImage.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'super hyrando 3',
            chname:"高級抗磨耗油壓作動油",
            category: 'IndustrialLubricants',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/noImage.jpg`,
                imageOrigin:""
            },
            description: '',
        },
        {
            name: 'super hyrando 4',
            chname:"高級抗磨耗油壓作動油",
            category: 'IndustrialLubricants',
            image: {
                imageURL:`${process.env.PUBLIC_URL}/upload/noImage.jpg`,
                imageOrigin:""
            },
            description: '',
        },
    ],
    users: [
        {
            name: 'admin',
            email: 'admin@example.com',
            password: `${process.env.AdminPassword}`
        }
    ]
};

export default data;