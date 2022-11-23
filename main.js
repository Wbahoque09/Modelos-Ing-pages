var app = new Vue({
    el: "#app",
    data: {
      object1: 10,
      object2: 10,
      water1: 0,
      water2: 0,
      reloadEnabled: false,
      CALOR_ESPECIFICO_AGUA: 1,
    },
    methods: {
      async calcularEquilibrioTermico() {
        this.reloadEnabled = true;
  
        const eqObject1Part1 =
          this.grAkg(this.water1) * this.CALOR_ESPECIFICO_AGUA;
        const eqObject1Part2 = {
          scalar: eqObject1Part1 * this.object1,
          let: -1 * eqObject1Part1,
        };
  
        console.log(eqObject1Part2);
  
        const eqObject2Part1 =
          this.grAkg(this.water2) * this.CALOR_ESPECIFICO_AGUA;
        const eqObject2Part2 = {
          scalar: -1 * eqObject2Part1 * this.object2,
          let: eqObject2Part1,
        };
  
        const denominador = eqObject1Part2.let - eqObject2Part2.let;
        const numerador = eqObject2Part2.scalar - eqObject1Part2.scalar;
  
        const temperatura = numerador / denominador;
        
        if (!Number.isNaN(temperatura)) {
          await this.sleep(1000);
          this.object1 = temperatura.toFixed(1);
          this.object2 = temperatura.toFixed(1);
        }
  
        // const calorObjecto1 = this.grAkg(this.water1)*CALOR_ESPECIFICO_AGUA*(water1-5);
        // const calorObjecto2 = this.grAkg(this.water1)*CALOR_ESPECIFICO_AGUA*(15-5);
      },
      reiniciar() {
        this.object1 = 10;
        this.object2 = 10;
        this.water1 = 0;
        this.water2 = 0;
        this.reloadEnabled = false;
      },
      grAkg(valor) {
        return valor / 1000;
      },
      sleep(ms = 1000) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      },
    },
  });
  