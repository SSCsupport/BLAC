'use client'

import { motion, useInView, useSpring, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'

export function AnimatedNumber({
	value,
	format = (value) => value.toLocaleString(),
}: {
	value: number
	format?: (value: number) => string
}) {
	const initialValue = 0
	const spring = useSpring(initialValue, {
		mass: 0.8,
		stiffness: 75,
		damping: 15,
	})

	const ref = useRef<HTMLElement>(null)
	const isInView = useInView(ref, { once: true, amount: 1 })
	useEffect(() => {
		if (!isInView) return
		spring.set(value)
	}, [spring, value, isInView])

	const transformedValue = useTransform(spring, format)

	return <motion.span ref={ref}>{transformedValue}</motion.span>
}
