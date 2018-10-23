// LineChart.js
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

const fonts = {
  base: 'Cerebri Sans'
}
const colors = {
  gray: {
    100: '#95AAC9',
    300: '#E3EBF6',
    600: '#95AAC9',
    700: '#6E84A3',
    900: '#283E59'
  },
  primary: {
    100: '#D2DDEC',
    300: '#A6C5F7',
    700: '#2C7BE5'
  },
  black: '#12263F',
  white: '#FFFFFF',
  transparent: 'transparent'
}

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        defaultColor: colors.primary[600],
        defaultFontColor: colors.gray[600],
        defaultFontFamily: fonts.base,
        defaultFontSize: 13,
        layout: {
          padding: 0
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 16
          }
        },
        elements: {
          point: {
            radius: 0,
            backgroundColor: colors.primary[700]
          },
          line: {
            tension: 0.4,
            borderWidth: 3,
            borderColor: colors.primary[700],
            backgroundColor: colors.transparent,
            borderCapStyle: 'rounded'
          },
          rectangle: {
            backgroundColor: colors.primary[700]
          },
          arc: {
            borderWidth: 4,
            backgroundColor: colors.primary[700]
          }
        },
        cutoutPercentage: 83
      }
    }
  },
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
