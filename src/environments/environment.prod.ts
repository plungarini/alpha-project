export const environment = {
	production: true,
	stripe: {
		prod: 'pk_live_51HwSHjAM7M4RC2nWfC5rmxJD9yzOkQg7TIyLXSkrx7ieYMPtfenyO6g8SydncAmJYiSJQzo1KKlyQm0mc1QFbOjt00ZXSAXRUF',
		test: 'pk_test_51HwSHjAM7M4RC2nWiv5FZonP8VuFdnODpu8SGCvtN0UdYFIAz5z85gejBaVdFzjco8GLV8Znn6ldHshfHeBoM28e00D8kfU6ZA',
	},
	stripeProducts: {
		prod: {
			month: 'price_1HwqWmAM7M4RC2nW74C1Cjqk',
			year: 'price_1HwqVzAM7M4RC2nWrUOXQccN',
		},
		test: {
			month: 'price_1IUwjJAM7M4RC2nWXSqMC1hq',
			year: 'price_1IUwkGAM7M4RC2nWRHSQnhUz',
		},
	},
	firebase: {
		apiKey: 'AIzaSyCK33IzBFHgK8ylZuv_7_BHaSsFG1mzIns',
		authDomain: 'alpha-project-lorenzoni.firebaseapp.com',
		projectId: 'alpha-project-lorenzoni',
		storageBucket: 'alpha-project-lorenzoni.appspot.com',
		messagingSenderId: '542791244569',
		appId: '1:542791244569:web:44632575874123918a8388',
		measurementId: 'G-KG7L64YL3R'
	}
};
