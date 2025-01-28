import {
  AbsoluteCenter,
  Box,
  createListCollection,
  Heading,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from "@chakra-ui/react"
import { useState } from 'react'
import { Circle, LineBySlope } from '../components/Geometry'

const useClock = () : {
  h: number, 
  m: number,
  s: number, 
  d: number, 
  M: number, 
  Y: number
} | null => {
  const [h, setHour] = useState<number>()
  const [m, setMinute] = useState<number>()
  const [s, setSecond] = useState<number>()
  const [d, setDay] = useState<number>()
  const [M, setMonth] = useState<number>()
  const [Y, setYear] = useState<number>()

  const resetTime = () => {
    const date = new Date()
    setHour(date.getHours())
    setMinute(date.getMinutes())
    setSecond(date.getSeconds())
    setDay(date.getDay())
    setMonth(date.getMonth() + 1)
    setYear(date.getFullYear())
  }

  setTimeout(resetTime, 1000); 
  if (Y === undefined) resetTime()

  if (h === undefined) return null
  if (m === undefined) return null
  if (s === undefined) return null
  if (d === undefined) return null
  if (M === undefined) return null
  if (Y === undefined) return null
  return {h, m, s, d, M, Y}
}

const LoadingPage = () => (
  <AbsoluteCenter> Loading... </AbsoluteCenter>
)

const AnalogClock = () => {
  const clock = useClock()
  if (!clock) return LoadingPage()
  let {h, m, s} = clock

  const sHand = s / 60 * 360
  const mHand = (m * 60 + s) / 3600 * 360
  const hHand = ((h%12) * 3600 + m * 60 + s) / 43200 * 360

  // by this standard, angle of -90 degree points north
  return (
    <AbsoluteCenter>
      <Circle radius={300}>
        <Circle radius={10} />
        <LineBySlope length={110} angle={-90 + sHand} width={2} />
        <LineBySlope length={105} angle={-90 + mHand} />
        <LineBySlope length={80}  angle={-90 + hHand} width={7} color={"red"} />
      </Circle>
    </AbsoluteCenter>
  )
}

const SimpleClock = () => {
  const clock = useClock()
  if (!clock) return LoadingPage()
  const {h, m, s, d, M, Y} = clock

  const hour   = h.toString().padStart(2, "0")
  const minute = m.toString().padStart(2, "0")
  const second = s.toString().padStart(2, "0")

  const line1 = `${hour}:${minute}:${second}`
  const line2 = `${d} / ${M} / ${Y}`
  return (
    <AbsoluteCenter>
      <Box textAlign="center">
      <Heading fontFamily="Monaco" size="7xl" letterSpacing="tight">
        {line1}
      </Heading>
      <Heading fontFamily="Monaco" size="5xl" letterSpacing="tight">
        {line2}
      </Heading>
      </Box>
    </AbsoluteCenter>
  )
}

export default () => {
    
  const clockItems = [
      {label: "Analog", value: "analog"}, 
      {label: "Digital", value: "digital"}, 
    ] as const

  const clockTypes = createListCollection({ items: clockItems })

  type ClockType = (typeof clockItems)[number]['value']

  const [clock, setClock] = useState<ClockType>(clockItems[0].value)

  return (
    <>
      <Box width="100%" p={10}>
        <SelectRoot 
          width="150px" 
          collection={clockTypes}
          onValueChange={({value}) => setClock(value[0] as any)}
          defaultValue={[clock]}
        >
          <SelectLabel />
          <SelectTrigger>
            <SelectValueText />
          </SelectTrigger>
          <SelectContent>
            {clockTypes.items.map((clock) => (
              <SelectItem item={clock} key={clock.value}>
                {clock.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Box>
      { clock == "analog" &&  <AnalogClock /> }
      { clock == "digital" && <SimpleClock /> }
    </>
  )
}
