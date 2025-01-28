import {
  Box,
} from "@chakra-ui/react"
import { PropsWithChildren } from 'react'

export const Circle = (
  {radius, top, left, children}
  : PropsWithChildren<{radius: number, top?: number, left?: number}>
) => {
  return (
    <Box position="absolute">
      <Box 
        position="relative"
        display="flex"
        top={top}
        left={left}
        m="-5px" 
        p="0px"
        borderColor="black"
        borderStyle="solid" 
        borderWidth="5px"
        width={`${radius}px`} 
        height={`${radius}px`} 
        borderRadius={`${radius}px`} 
        justifyContent={"center"}
        alignItems={"center"}
      >
        {children}
      </Box>
    </Box>
  )
}

type Point = {x: number, y: number}


type ILinePropByPoints = {
  origin?: Point, 
  target: Point, 
  color?:string, 
  width?: number
}

type ILinePropBySlope = {
  origin?: Point, 
  length: number,
  angle: number,
  color?:string, 
  width?: number
}

export const LineBySlope = (prop: ILinePropBySlope) => {
  let {origin, length, angle, color, width} = prop
  if (!origin) origin = {x: 0, y: 0}
  if (!color) color = "black"
  if (!width) width = 5

  const posTop = origin.y + (length * Math.sin(angle / 180 * Math.PI)/2)
  const posLeft = origin.x + (length * Math.cos(angle / 180 * Math.PI)/2)

  return (
    <Box position="absolute">
      <Box 
        position="relative"
        top={`${posTop}px`}
        left={`${posLeft}px`}
        width={`${length}px`}
        height={`${width}px`}
        bg={color}
        borderRadius={`${width}px`}
        rotate={`${angle}deg`}
      />
    </Box>
  )
}

export const LineByPoints = (prop: ILinePropByPoints) => {
  let {origin, target, color, width} = prop
  if (!origin) origin = {x: 0, y: 0}
  let length = Math.sqrt((origin.x - target.x)**2 + (origin.y - target.y)**2)
  let angle = origin.x == target.x 
    ? 180 
    : Math.atan((origin.y - target.y)/(origin.x - target.x)) * 180 / Math.PI
  return LineBySlope({origin, length, angle, color, width})
}

