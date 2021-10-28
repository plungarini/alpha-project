const pack1 = '/assets/icons/workout/pack-1/exercise-';
const pack2 = '/assets/icons/workout/pack-2/exercise-';

const WORKOUT_IMAGES = [

	// Pack 1
	{
		id: 1,
		tags: 'traction, tractions, trazioni',
		path: pack1 + 'traction.svg',
	},
	{
		id: 2,
		tags: 'traction, tractions, trazioni, back, dietro, schiena',
		path: pack1 + 'back-tractions.svg',
	},
	{
		id: 3,
		tags: 'traction, tractions, trazioni, back, dietro, schiena',
		path: pack1 + 'back-tractions-2.svg',
	},
	{
		id: 4,
		tags: 'palla',
		path: pack1 + 'ball.svg',
	},
	{
		id: 5,
		tags: 'palla',
		path: pack1 + 'ball-2.svg',
	},
	{
		id: 6,
		tags: 'palla',
		path: pack1 + 'ball-3.svg',
	},
	{
		id: 7,
		tags: 'palla',
		path: pack1 + 'ball-4.svg',
	},
	{
		id: 8,
		tags: 'palla',
		path: pack1 + 'ball-5.svg',
	},
	{
		id: 9,
		tags: 'palla',
		path: pack1 + 'ball-6.svg',
	},
	{
		id: 10,
		tags: 'palla',
		path: pack1 + 'ball-7.svg',
	},
	{
		id: 11,
		tags: 'salto, barra',
		path: pack1 + 'bar-jump.svg',
	},
	{
		id: 12,
		tags: 'pesi, mano, mani, trazioni, sollevamento, weight, weight, lift',
		path: pack1 + 'hand-dubbell.svg',
	},
	{
		id: 13,
		tags: 'pesi, mano, mani, trazioni, sollevamento, weight, weight, lift',
		path: pack1 + 'hand-dubbell-2.svg',
	},
	{
		id: 14,
		tags: 'pesi, mano, mani, trazioni, sollevamento, weight, weight, lift',
		path: pack1 + 'hand-dubbell-3.svg',
	},
	{
		id: 15,
		tags: 'salto, jumping, jumping, jacks',
		path: pack1 + 'jumping-jacks.svg',
	},
	{
		id: 16,
		tags: 'gambe, leg, legs, gamba',
		path: pack1 + 'leg-work.svg',
	},
	{
		id: 17,
		tags: 'traction, tractions, trazioni, sotto',
		path: pack1 + 'lower-tractions.svg',
	},
	{
		id: 18,
		tags: 'mountain, climb',
		path: pack1 + 'mountain-climb.svg',
	},
	{
		id: 19,
		tags: 'pelvico, pelvic',
		path: pack1 + 'pelvic.svg',
	},
	{
		id: 20,
		tags: 'plank',
		path: pack1 + 'plank.svg',
	},
	{
		id: 21,
		tags: 'pushup, push up, flessioni',
		path: pack1 + 'pushup.svg',
	},
	{
		id: 22,
		tags: 'sprint, corsa',
		path: pack1 + 'sprint.svg',
	},
	{
		id: 23,
		tags: 'step',
		path: pack1 + 'step.svg',
	},
	{
		id: 24,
		tags: 'step',
		path: pack1 + 'step-2.svg',
	},
	{
		id: 25,
		tags: 'step, pesi, peso',
		path: pack1 + 'step-weight.svg',
	},
	{
		id: 26,
		tags: 'stretching, rilassamento',
		path: pack1 + 'stretching.svg',
	},
	{
		id: 27,
		tags: 'stretching, rilassamento',
		path: pack1 + 'stretching-2.svg',
	},
	{
		id: 28,
		tags: 'stretching, rilassamento',
		path: pack1 + 'stretching-3.svg',
	},
	{
		id: 29,
		tags: 'stretching, rilassamento',
		path: pack1 + 'stretching-4.svg',
	},
	{
		id: 30,
		tags: 'stretching, rilassamento',
		path: pack1 + 'stretching-5.svg',
	},
	{
		id: 31,
		tags: 'stretching, rilassamento',
		path: pack1 + 'stretching-6.svg',
	},
	{
		id: 32,
		tags: 'stretching, rilassamento',
		path: pack1 + 'stretching-7.svg',
	},
	{
		id: 33,
		tags: 'stretching, rilassamento',
		path: pack1 + 'stretching-8.svg',
	},
	{
		id: 34,
		tags: 'tapis, tapis roulant, roulant, corsa',
		path: pack1 + 'treadmill.svg',
	},
	{
		id: 35,
		tags: 'tapis, tapis roulant, roulant, corsa',
		path: pack1 + 'treadmill-2.svg',
	},
	{
		id: 36,
		tags: 'sollevamento, pesi, weight, lift',
		path: pack1 + 'weight-lift.svg',
	},
	{
		id: 37,
		tags: 'sollevamento, pesi, weight, lift',
		path: pack1 + 'weight-lift-2.svg',
	},
	{
		id: 38,
		tags: 'sollevamento, pesi, weight, lift',
		path: pack1 + 'weight-lift-3.svg',
	},
	{
		id: 39,
		tags: 'sollevamento, pesi, weight, lift',
		path: pack1 + 'weight-lift-4.svg',
	},
	{
		id: 40,
		tags: 'sollevamento, pesi, weight, lift',
		path: pack1 + 'weight-lift-5.svg',
	},
	{
		id: 41,
		tags: 'sollevamento, pesi, weight, lift',
		path: pack1 + 'weight-lift-6.svg',
	},
	{
		id: 42,
		tags: 'sollevamento, pesi, weight, lift',
		path: pack1 + 'weight-lift-7.svg',
	},
	{
		id: 43,
		tags: 'sollevamento, pesi, weight, lift',
		path: pack1 + 'weight-lift-8.svg',
	},
	{
		id: 44,
		tags: 'sollevamento, pesi, weight, lift',
		path: pack1 + 'weight-lift-lower.svg',
	},
	{
		id: 45,
		tags: 'sollevamento, pesi, weight, lift, trazioni, tractions',
		path: pack1 + 'weight-lift-tractions.svg',
	},



	/* ------------------------------------------------------------------------------------------------------ */



	// Pack 2
	{
		id: 46,
		tags: 'addominali, abs, torace',
		path: pack2 + 'abs.svg',
	},
	{
		id: 47,
		tags: 'addominali, abs, torace',
		path: pack2 + 'abs-2.svg',
	},
	{
		id: 48,
		tags: 'palla',
		path: pack2 + 'ball.svg',
	},
	{
		id: 49,
		tags: 'orologio, stretching, braccia, mani',
		path: pack2 + 'clock-12-15.svg',
	},
	{
		id: 50,
		tags: 'mani, braccia, spalle',
		path: pack2 + 'hands-horizontal.svg',
	},
	{
		id: 51,
		tags: 'mani, spalle, stretching',
		path: pack2 + 'hands-up.svg',
	},
	{
		id: 52,
		tags: 'mani, spalle, stretching',
		path: pack2 + 'hands-up-2.svg',
	},
	{
		id: 53,
		tags: 'salto, alto',
		path: pack2 + 'jump-high.svg',
	},
	{
		id: 54,
		tags: 'scala, step',
		path: pack2 + 'ladder.svg',
	},
	{
		id: 55,
		tags: 'mani, sinistra, stretching',
		path: pack2 + 'left-hand-up.svg',
	},
	{
		id: 56,
		tags: 'mani, sinistra, stretching',
		path: pack2 + 'left-hand-up-2.svg',
	},
	{
		id: 57,
		tags: 'addominali, pancia',
		path: pack2 + 'lower-abs.svg',
	},
	{
		id: 58,
		tags: 'push up, pushup, push',
		path: pack2 + 'push-up.svg',
	},
	{
		id: 59,
		tags: 'cerchio',
		path: pack2 + 'ring.svg',
	},
	{
		id: 60,
		tags: 'salto, corda, salti',
		path: pack2 + 'rope-jump.svg',
	},
	{
		id: 61,
		tags: 'corsa, veloce',
		path: pack2 + 'run-fast.svg',
	},
	{
		id: 62,
		tags: 'corsa',
		path: pack2 + 'run.svg',
	},
	{
		id: 63,
		tags: 'squat, piegamento',
		path: pack2 + 'squat.svg',
	},
	{
		id: 64,
		tags: 'squat, piegamento',
		path: pack2 + 'squat-2.svg',
	},
	{
		id: 65,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching.svg',
	},
	{
		id: 66,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching-2.svg',
	},
	{
		id: 67,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching-3.svg',
	},
	{
		id: 68,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching-4.svg',
	},
	{
		id: 69,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching-5.svg',
	},
	{
		id: 70,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching-6.svg',
	},
	{
		id: 71,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching-7.svg',
	},
	{
		id: 72,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching-8.svg',
	},
	{
		id: 73,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching-9.svg',
	},
	{
		id: 74,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching-10.svg',
	},
	{
		id: 75,
		tags: 'stretching, rilassamento',
		path: pack2 + 'stretching-11.svg',
	},
	{
		id: 76,
		tags: 'nuoto',
		path: pack2 + 'swimming.svg',
	},
	{
		id: 77,
		tags: 'camminata, camminare',
		path: pack2 + 'walk-fast.svg',
	},
	{
		id: 78,
		tags: 'camminata, camminare',
		path: pack2 + 'walk-slow.svg',
	},
	{
		id: 79,
		tags: 'sollevamento, pesi, weight, lift',
		path: pack2 + 'weightlifting-left.svg',
	},
];


export default WORKOUT_IMAGES;
