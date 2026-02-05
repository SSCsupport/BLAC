export const company = {
	fullName: 'Black Lawyers Association of Cincinnati',
	shortName: 'BLAC',
	description: '',
	contactEmail: '#',
}

export const donationLink = '#'
export const contactLink =
	'https://docs.google.com/forms/d/e/1FAIpQLScfmXpSY9BBpV71gNd199QypfIszHVgYA0B7hXpb6IuGtQUIQ/viewform?usp=sharing&ouid=107516571181674962497'

export const membership = {
	annual: {
		id: 'annual',
		label: 'Annual Membership',
		description:
			'Full member benefits: programs, CLE discounts, mentorship, and events.',
		price: 60,
		timeframe: 'annual',
		href: 'https://buy.stripe.com/28ocP7efy4JC2rKcMM',
	},
	lifetime: {
		id: 'lifetime',
		label: 'Lifetime Membership',
		description:
			'One payment. No renewals. Permanent recongnition as a Lifetime Member.',
		price: 600,
		timeframe: 'one-time',
		href: 'https://buy.stripe.com/eVa7uNefyb809Uc3ce',
	},
	attorneyAnnual: {
		id: 'attorney-annual',
		label: 'New Attorney Membership',
		description:
			'For attorneys in their first 3 years of practice. Same benefits at a reduced rate.',
		price: 40,
		timeframe: 'annual',
		href: 'https://buy.stripe.com/3cs4iB8Ve7VO5DWcMQ',
	},
	associateAnnual: {
		id: 'associate-annual',
		label: 'Associate Membership',
		description: 'For allies, law students, paralegals, and community partners',
		price: 30,
		timeframe: 'annual',
		href: 'https://buy.stripe.com/eVa6qJ2wQ6RKfewcMP',
	},
}

export const socials = {
	facebook: {
		title: 'Facebook',
		to: 'https://www.facebook.com/cincyblac/',
		iconName: 'facebook',
	},
} as const
