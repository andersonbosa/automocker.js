
import { default as mocksDatabase } from "./assets/db/mocks.json"

const TYPES = {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  phone: 'phone',
  number: 'number',
}

function getAllInputs () {
  return document.querySelectorAll("input") || []
}

function parseMockType (input) {
  const inputType = input.getAttribute("type")
  if (inputType === TYPES.number) {
    return TYPES.number
  }

  const inputContent = `${input.placeholder} ${input.type} ${input.id}`.toLowerCase()

  const mockType = Object.keys(TYPES).find(
    typeKey => (inputContent.includes(typeKey))
  )
  if (mockType) {
    return mockType
  }

  return
}

function getRandomFromArr (arr = []) {
  const randomIndex = Math.floor(Math.random() * arr.length)

  return arr[randomIndex]
}

function setMockType (input, contentType) {
  const possibilities = mocksDatabase.filter(
    mockItem => (mockItem.type === contentType)
  )

  const mockItem = getRandomFromArr(possibilities)

  if (!mockItem) {
    input.value = 'any'
    return
  }

  input.value = mockItem.content
}

function injectRandomContent () {
  const inputs = getAllInputs()

  if (!inputs) {
    throw new Error('Inputs are missing')
  }

  inputs.forEach((input) => {
    const contentType = parseMockType(input)
    setMockType(input, contentType)
  })
}


function bindInjectionByEventsTrigger () {
  const injectionHandler = evt => {
    console.log('[INFO] triggering injection in the inputs...')
    setTimeout(
      () => { injectRandomContent() },
      250
    )
  }

  window.document.addEventListener('click', injectionHandler)
}

/* ========================================================================= */


async function main (startUpOptions = {}) {
  /* https://ascii-generator.site/t/ */
  const banner = `\n   ##     ##  ##   ######    ####    ##   ##   ####     ####    ##  ##   ######   #####               ####    ####   \n  ####    ##  ##     ##     ##  ##   ### ###  ##  ##   ##  ##   ## ##    ##       ##  ##               ##    ##  ##  \n ##  ##   ##  ##     ##     ##  ##   #######  ##  ##   ##       ####     ##       ##  ##               ##    ##      \n ######   ##  ##     ##     ##  ##   ## # ##  ##  ##   ##       ###      ####     #####                ##     ####   \n ##  ##   ##  ##     ##     ##  ##   ##   ##  ##  ##   ##       ####     ##       ####                 ##        ##  \n ##  ##   ##  ##     ##     ##  ##   ##   ##  ##  ##   ##  ##   ## ##    ##       ## ##      ##     ## ##    ##  ##  \n ##  ##    ####      ##      ####    ##   ##   ####     ####    ##  ##   ######   ##  ##     ##      ###      #### `
  console.log(banner)

  injectRandomContent()
  bindInjectionByEventsTrigger()
}


setTimeout(main, 500)