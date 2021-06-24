export const writingCategories = ['sum', 'essais', 'dev', 'gallary']

export const categories = ['home', ...writingCategories, 'library', 'contact']

export default function isValidCategory(category : any) : boolean {
  return writingCategories.reduce((prev, value) => {
    if (value === category) {
      return [true]
    }
    return prev
  }, [false])[0]
}
