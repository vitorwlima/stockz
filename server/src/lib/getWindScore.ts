import { Stock } from 'b3-scraper/dist/@types/stock'
import { getAverage } from 'src/utils/getAverage'

export type WindScore = {
  valuation: number | null
  efficiency: number | null
  debt: number | null
  profitability: number | null
  windFinalScore: number
  holderChecklist: {
    liquidity: boolean
    debt: boolean
    roe: boolean
    profit: boolean
  }
}

const getValuationScore = (valuation: Stock['valuation']) => {
  if (
    valuation.priceToProfitRatio === null ||
    valuation.priceToBookRatio === null ||
    valuation.evToEbitRatio === null
  ) {
    return null
  }

  const dividendMultiplier = valuation.dividendYield
    ? 1 + valuation.dividendYield / 100
    : 1

  let valuationBadMultiplier =
    valuation.priceToProfitRatio *
    valuation.priceToBookRatio *
    valuation.evToEbitRatio

  const valuationGoodMultiplier = dividendMultiplier

  if (
    valuation.priceToProfitRatio < 0 ||
    valuation.priceToBookRatio < 0 ||
    valuation.evToEbitRatio < 0
  ) {
    valuationBadMultiplier = Math.abs(valuationBadMultiplier) * -1
  }

  const score = Math.sqrt(valuationGoodMultiplier / valuationBadMultiplier)

  return score * 100
}

const getEfficiencyScore = (efficiency: Stock['efficiency']) => {
  if (efficiency.ebitMargin === null || efficiency.netMargin === null) {
    return null
  }

  const grossMarginMultiplier = efficiency.grossMargin
    ? 1 + efficiency.grossMargin / 100
    : 1

  const netAndEbitMarginMultiplier = getAverage([
    efficiency.ebitMargin,
    efficiency.netMargin,
  ])

  const score = grossMarginMultiplier * (1 + netAndEbitMarginMultiplier / 100)

  return score * 5
}

const getDebtScore = (debt: Stock['debt']) => {
  if (debt.currentLiquidity === null || debt.equityToAssetsRatio === null) {
    return null
  }

  const score = Math.sqrt(debt.currentLiquidity * debt.equityToAssetsRatio)

  return score * 10
}

const getProfitabilityScore = (profitability: Stock['profitability']) => {
  if (
    profitability.returnOnEquity === null ||
    profitability.returnOnEquity < 0 ||
    profitability.returnOnInvestedCapital === null ||
    profitability.assetTurnover === null
  ) {
    return null
  }

  const roeRoicMultiplier =
    profitability.returnOnEquity + profitability.returnOnInvestedCapital

  const score =
    Math.pow(roeRoicMultiplier, 0.85) * Math.sqrt(profitability.assetTurnover)

  return score
}

export const getWindScore = (stock: Stock): WindScore => {
  const valuation = getValuationScore(stock.valuation)
  const efficiency = getEfficiencyScore(stock.efficiency)
  const debt = getDebtScore(stock.debt)
  const profitability = getProfitabilityScore(stock.profitability)
  const windFinalScore = getAverage([
    valuation || 0,
    valuation || 0,
    efficiency || 0,
    debt || 0,
    profitability || 0,
  ])

  const holderChecklist = {
    liquidity:
      stock.about.averageLiquidity !== null &&
      stock.about.averageLiquidity > 1000000,
    debt:
      stock.balance.grossDebt !== null &&
      stock.balance.netWorth !== null &&
      stock.balance.grossDebt < stock.balance.netWorth,
    roe:
      stock.profitability.returnOnEquity !== null &&
      stock.profitability.returnOnEquity > 10,
    profit: stock.balance.netProfit !== null && stock.balance.netProfit > 0,
  }

  return {
    valuation,
    efficiency,
    debt,
    profitability,
    windFinalScore,
    holderChecklist,
  }
}
