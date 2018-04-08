import DateInterface from './DateInterface'
import pad from './pad'

export default (locale, options, { start, length } = { start: 0, length: 0 }) => {
  const makeIsoString = dateString => {
    const [year, month, date] = dateString.trim().split(' ')[0].split('-')
    return [year, pad(month || 1), pad(date || 1)].join('-')
  }

  try {
    // console.info(locale)
    const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options)
    if (locale === 'fa-ir') {
      return dateString => {
        let isodate = makeIsoString(dateString)
        let pdate = new DateInterface(`${isodate}T00:00:00+00:00`)
        // pdate.addDays(1)
        let gdate = pdate.toDate()
        let formatted = intlFormatter.format(gdate)
        // console.info(`isodate : ${isodate},pdate : ${pdate.toString()},gdate : ${gdate.toString()},formatted : ${formatted}`)
        return formatted
      }
    } else {
      return dateString => {
        // console.log(options)
        let isodate = makeIsoString(dateString)
        let gdate = new Date(`${isodate}T00:00:00+00:00`)
        let formatted = intlFormatter.format(gdate)
        // console.info(`isodate : ${isodate},gdate : ${gdate.toString()},formatted : ${formatted}`)
        return formatted
      }
    }
  } catch (e) {
    return (start || length) ? dateString => makeIsoString(dateString).substr(start, length) : null
  }
}
