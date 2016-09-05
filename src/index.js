import React from 'react'

export default class Component extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      availability: {
        morning: {},
        day: {},
        evening: {},
        overnight: {}
      }
    }

    this.getValue = this.getValue.bind(this)
    this.renderShiftWeek = this.renderShiftWeek.bind(this)
    this.handleBlockClick = this.handleBlockClick.bind(this)
  }

  /**
   * Returns the value of this.state.availability
   */
  getValue () {
    return this.state.availability
  }

  /**
   * Render a <td> with onClick handler and style based on `status`
   * @param {bool|null} status true=avail, false=unavail, undefined=not set
   */
  renderBlock (status, shift, day) {
    const styles = {
      available: { backgroundColor: 'green' },
      unavailable: { backgroundColor: 'orange' }
    }

    let style = status === true ? styles.available : styles.unavailable

    Object.assign(style, {
      height: '50px', width: '100%', border: '1px solid rgb(122, 118, 53)'
    })

    return (
      <td key={Math.random()}>
        <div style={style} data-id={shift + '|' + day} onClick={this.handleBlockClick}>
          {/* */}
        </div>
      </td>
    )
  }

  renderShiftWeek (shift) {
    const self = this
    const week = [0, 1, 2, 3, 4, 5, 6, 7]
    return week.map((el, i) => {
      if (i === 0) {
        return (
          <td key={Math.random()} style={{fontWeight: '700'}}>
            {shift}
          </td>
        )
      }
      shift = shift.toLowerCase()
      return self.renderBlock(self.state.availability[shift][i], shift, i)
    })
  }

  handleBlockClick (e) {
    const el = e.currentTarget.getAttribute('data-id')
    const shift = el.substr(0, el.indexOf('|'))
    const day = el.substr(el.indexOf('|') + 1, el.length)
    let availability = {}
    Object.assign(availability, this.state.availability)
    availability[shift][day] = !availability[shift][day]

    this.setState({
      availability: availability
    })
  }

  render () {
    const renderKey = () => {
      return (
        <div style={{width: '250px', padding: '10px'}}>
          <span style={{fontSize: '12px', color: 'grey'}}>* Click on the time blocks to change your availability</span>
          <div style={{backgroundColor: 'green', margin: '5px', padding: '5px'}}>
            Available
          </div>
          <div style={{backgroundColor: 'orange', margin: '5px', padding: '5px'}}>
            Unavailable
          </div>
        </div>
      )
    }

    const thStyle = {
      textAlign: 'center',
      minWidth: '50px',
      maxWidth: '150px'
    }

    return (
      <div>
        <table style={{width: '100%', textAlign: 'center'}}>
          <tbody>
            <tr>
              <th style={{width: '100px'}}>
                {/* */}
              </th>
              <th style={thStyle}>
                Mon
              </th>
              <th style={thStyle}>
                Tue
              </th>
              <th style={thStyle}>
                Wed
              </th>
              <th style={thStyle}>
                Thu
              </th>
              <th style={thStyle}>
                Fri
              </th>
              <th style={thStyle}>
                Sat
              </th>
              <th style={thStyle}>
                Sun
              </th>
            </tr>
            <tr>
              {this.renderShiftWeek('Morning')}
            </tr>
            <tr>
              {this.renderShiftWeek('Day')}
            </tr>
            <tr>
              {this.renderShiftWeek('Evening')}
            </tr>
            <tr>
              {this.renderShiftWeek('Overnight')}
            </tr>
          </tbody>
        </table>
        {renderKey()}
      </div>
    )
  }
}
