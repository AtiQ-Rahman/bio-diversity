export const imageLoader = ({ src }) => `${src}`
export const twoDecimal = (num) => {
    console.log(parseFloat(num))
    return (Math.round(parseFloat(num) * 100000) / 100000).toFixed(5);
}