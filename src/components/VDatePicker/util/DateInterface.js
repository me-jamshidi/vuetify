import PersianDate from 'persian-date'

function DateInterface (input, locale = 'fa-ir') {
    if (locale === 'fa-ir') {
        faIR(this, input)
    } else {
        enUS(this, input)
    }
}

function faIR (that, input) {
    if (typeof input === 'string') {
        if (input.includes('T')) {
            let dateParts = input.split('T')[0].split('-').map(part => part * 1)
            that.date = new PersianDate(dateParts)
        } else {
            let dateParts = input.split('-').map(part => part * 1)
            that.date = new PersianDate(dateParts)
        }
    }
    else {
        that.date = new PersianDate()
    }

    that.getFullYear = function () {
        return this.date.year()
    }
    that.getMonth = function () {
        return this.date.month() - 1
    }
    that.getDate = function () {
        return this.date.date()
    }
    that.getUTCDay = function () {
        let d = this.date.add('m', this.date.zone()*-1) // miniutes
        return d.toDate().getUTCDay()
    }
    that.daysInMonth = function () {
        return this.date.daysInMonth()
    }
    that.toDate = function () {
        let d = this.date.add('m', this.date.zone()*-1) // miniutes
        return d.toDate()
    }
    that.toString = function () {
        return this.date.format()
    }
    that.addDays = function (days) {
        this.date = this.date.add('d', days)
    }
}

function enUS (that, input) {
    // console.warn(input)
    if (typeof input === 'string') {
        if (input.includes('T')) {
            let dateParts = input.split('T')[0].split('-').map(part => part * 1)
            that.date = new Date(Date.UTC(dateParts[0], dateParts[2] !== 0 ? dateParts[1] - 1 : dateParts[1], dateParts[2]))
        } else {
            let dateParts = input.split('-').map(part => part * 1)
            that.date = new Date(Date.UTC(dateParts[0], dateParts[2] !== 0 ? dateParts[1] - 1 : dateParts[1], dateParts[2]))
        }
    }
    else {
        that.date = new Date()
    }
    // console.info(that.date)
    that.getFullYear = function () {
        return this.date.getFullYear()
    }
    that.getMonth = function () {
        return this.date.getMonth()
    }
    that.getDate = function () {
        return this.date.getDate()
    }
    that.getUTCDay = function () {
        return this.date.getUTCDay()
    }
    that.daysInMonth = function () {
        // console.warn({y: this.date.getFullYear(), m: this.date.getMonth()})
        return this.date.getDate()
    }
    that.toDate = function () {
        return this.date
    }
    that.toString = function () {
        return this.date.toString()
    }
    // that.addDays = function (days) {
    //     this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.getDate() + days)
    // }
}

export default DateInterface