const categories = ['sum', 'essais', 'dev']

export default function isValidCategory(category : any) : boolean {
  return categories.reduce((prev, value) => {
    if (value === category) {
      return [true]
    }
    return prev
  }, [false])[0]
}
