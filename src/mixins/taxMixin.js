export default {
  computed: {
    licenseTax() {
      const license = this.cacheArea.content.comparison.cc;
      if (license <= 500) {
        return 1620;
      }
      if (license <= 600) {
        return 2160;
      }
      if (license <= 1200) {
        return 4320;
      }
      if (license <= 1800) {
        return 7120;
      }
      return 11230;
    },
    fuelTax() {
      const fuel = this.cacheArea.content.comparison.cc;
      if (fuel <= 500) {
        return 900;
      }
      if (fuel <= 600) {
        return 1200;
      }
      if (fuel <= 1200) {
        return 1800;
      }
      if (fuel <= 500) {
        return 900;
      }
      return 2010;
    },
    totalTax() {
      const total = this.licenseTax + this.fuelTax;
      return total;
    },
  },
};
