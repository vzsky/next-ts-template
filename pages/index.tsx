import {
  AbsoluteCenter,
  Box,
  Heading,
} from "@chakra-ui/react"
import { useState } from 'react'

const useClock = () => {
  const [hour, setHour] = useState<number>()
  const [minute, setMinute] = useState<number>()
  const [second, setSecond] = useState<number>()
  const [day, setDay] = useState<number>()
  const [month, setMonth] = useState<number>()
  const [year, setYear] = useState<number>()

  setTimeout(() => {
    const date = new Date()
    setHour(date.getHours())
    setMinute(date.getMinutes())
    setSecond(date.getSeconds())
    setDay(date.getDay())
    setMonth(date.getMonth() + 1)
    setYear(date.getFullYear())
  }, 1000); 

  return {hour, minute, second, day, month, year}
}

const useSimpleClock = () => {
  const { hour, minute, second, day, month, year } = useClock()
  if (!hour || !minute || !second || !day || !month || !year) return ["loading", "..."]
  let h = hour.toString(); if (hour < 10) h = "0" + h;
  let m = minute.toString(); if (minute < 10) m = "0" + m;
  let s = second.toString(); if (second < 10) s = "0" + s;
  return [`${h}:${m}:${s}`, `${day} / ${month} / ${year}`]
}

const ClockDisplay = ({clock}: any) => {
  const [line1, line2] = clock();
  return (
    <>
      <Heading fontFamily="Monaco" size="7xl" letterSpacing="tight">
        {line1}
      </Heading>
      <Heading fontFamily="Monaco" size="5xl" letterSpacing="tight">
        {line2}
      </Heading>
    </>
  )
}

export default () => (
  <>
    <AbsoluteCenter>
      <Box textAlign="center">
        <ClockDisplay clock={useSimpleClock}/>
      </Box>
    </AbsoluteCenter>
  </>
)
