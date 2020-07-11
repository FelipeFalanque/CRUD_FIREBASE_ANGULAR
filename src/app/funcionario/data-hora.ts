export class DataHora {

    constructor(
        public ano: number,
        public mes: number,
        public dia : number,
        public hora: number,
        public minuto: number
    ) {
        this.dataFormatada = `${this.ajusteNum(dia)}/${this.ajusteNum(mes + 1)}/${ano} ${this.ajusteNum(hora)}:${this.ajusteNum(minuto)}`;
    }

    // ano, mês, dia, hora, minuto, segundo,
    dataFormatada:string;

    private ajusteNum(numero:number){
        return numero < 10 ? `0${numero}` : `${numero}`
    }
}
