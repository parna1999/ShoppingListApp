import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
   recipesChanged = new Subject<Recipe[]>();
  //  private recipes: Recipe[]=[
  //       new Recipe(
  //         'Pizza Meal',
  //         'Super Tasty Pizza Meal',
  //         'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIkAlwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAFBgQHAAIDAf/EAEcQAAIBAgQDBQQGBggEBwAAAAECAwQRAAUSIQYxQRMiUWFxFDKBkQcjQlKxwRUzodHh8DRic3SCkrLxNUNysyQ2RFNjwtL/xAAZAQACAwEAAAAAAAAAAAAAAAABAgMEBQD/xAAqEQABBAICAgECBgMAAAAAAAABAAIDEQQSITETQVEioQUjMsHw8WFxkf/aAAwDAQACEQMRAD8AnI6ZNlrbjtt3kPME22Hw2/bhFetfMKpmLEjUSW+9jXM80qpmWhUsxchQt/eJ/wB8NuS8MiHLjsDJp3Yjc+mFLqTUsyACxkcgW2HXDPLUx+yOfs2sB4YBZ3k1Zl2UCspF1aIzK6jfUo3b42387Y3oDHW8PR1MjlaZhd2B3IPQeZJGCDaBCrypy6ozfNameERxU0LXeolOmNR/1cr9bfhjsJ6GkqDTwIKvTs0kpYFj/VXoPM3OHWko1mnSWoQaI/6PTabRwjne3V/6x38LYDcQZPS1cjTRkRVI3DqPe9R1/jjlyh0OXpmDyR0rLFUMPq1LX1NbYXPU72GAuXSTDMIJauLvBhs22wO/4Y8WpaMmGaV4pY7XMbW0sDcEehAIwcrZZc07OvpWhiOoirRmVO+ftKTzDcyByN9txhj0kUrJ4Gpc0qFmb6wBuyvykFjuPywFe36Xq4wztH2xdLn73eO3riR7d2DwduYJDT+4/bBBbw352xD7eJpJZWqKZpZDvaVbDwHPyxRhjdHIb6RbFJd0u8jtrsim9ipaxxpGFnYvIwHZg31X7xP548RKktfTqIOzRWf8Ccco7yE/eU7na4Phi7aJaR2t3pIpI9agEEEWZLEXsL/tP5Y4D6mYDtSxAHP05YlyvdCoa2nqBuMR2iAsYkLXW5tz5YJ5QXaWSOqUkmzkbkG1zjVqVHpe5pKuCGueuIMiv2lluCGva++JSzMsbIDuVsb9PPC0O1yA18emjBHVW+d1wIjtcYL5i5ana/g/T/pwHTngJwt+Sj0xmPVF1HpjMCk6sjhqg9t4sUsLrDCXt4FjpH7NXyxcop4afL1TQHkYCy/z5YrDggAZ1mEpB2jitbws37sWDUmV2gkQ2Ci5Hj5YA7S+kWpIteUaJgr2N9/tCwxW2RU8kKZnkCpqkoq1jCt7Ax6tSD5EYtWgXXRSqRY2NsIUVKBx9nkoBUdlAb3tuU3/AAw9Jb4XWSamnooayjcSRTLqV+Vh158jtax5YTc7qO0eZ0ZUUc3kNlHr+Vt/C+D/ABRPFldJUVV9FEzntiD+rcjkB11eHiD0xVk1XUZ/WIBIYacvaKMH9p8WP8OVhhXPDBZTxxukdQU+WBTr9mh7aQLr1yXB9dI5D5n0wvV4rQQk0jdmRfSvu29MXLwHlvYSSUlV2bJJEDHqF3BOx+VsG8l4RyxaeVapVrJwx7RmUGx6C1trDGZJn6N8gFhXxBG22v4pVHw9RUGYwKtRNLRxotu1MPaKW59ORsTh4pOFcipKNc3p5PbRGocyCQd/pa3Lxwt8RyR8PZ5MtNRN7G3dmhLWVj4rbkfC+CuQ0vYR0uYU0ehqi7LE51p0sORthHT/AJe9drRbCZHBt1X3XWoyrJKx3qIsoaTtiSwF2IXkLW90+nXCDndVJlebmClLVFLYMkU/fK+Qb3h88Neb8Q1VNnEtPBE0ftADdmi/a64Cvk2YUrvXzQrLZQxVt7Dpa/O3lhMSR7Du899C1JlYkckerRRB7Uw5NWLTRVJgeBpD3YJrbkjkrcifI78/DEUyMLhRpcXVwdmB8LdMOXajNOE3NZMJVdWftCwvqO5t1Fjf4Wwp5fSV+Y0yJmELQVAOilrnWyz9Ajn8GP8ADFzEzDIXNk4INLHysEx0WcodPWoKgKwcsp6csd5VCozi2kqLHxxBMUkdXKkkT9op0sp2ZDfe4x0kE0a6ZgD90dCvp8cTGZwfRWTuQ6ig+Y7xHkLBxYf4cCU2tgtWG9OwIH2yu99rDAnoLYsqwFuOQxmPBfpjzHIq4cmlhpMzkdWsWXSwOxFr2uPQnDnlNcauZDsU023xWAMj1caNJpnVu5Kf+YPBvH+OGLL6urR9NPHIsqjVInMAdCD1G426X64jcCDaI5FK30dY6BbkEuQAPPCpUOI5q+tQahNJr5e+AAi29dN/jgTlGb1NXXSUdVrjCINcl+QI5L+/5eI4/SDm5y3h6VoCBIwEcNttLHYfIXPww7T7SkWaCrDjbOJ89zI01Lc0VGTaxuHk+0+3pYeQHiccsmqKjK1UROimUg69NyLb28LY2ydVSkFEp0ySG7tpG2GGs/RtLA9PlkAqGpkvLUSElB0O218Z8+RZ1ItXXStw2iv1Fc6Dj3N6aaECKLUk1gjxm7jna/hz/Zh1h/TFE5q8vpjFHMqmaIMSLEfeO5I8cLHDKRNUCpR2Ekbwjum1zIwXTb0OH/iWGpy2nkly6puIoi3YtYgbcrty5bYz8g7jVjVZwczyk7Ac/PSQ+OOIKTMYzltLT1CS6xqvv3jtYnrzwW4BMEuXtBmM/Y+ysGQONOpAuxF+l7YUK+CWeq9uSJiKudRta3PdT54Z4OHKlYkq5FiqZezLJDTg6QdXhe+48MSGFjIQz+WtK2UW7V8LTIVy/MOJ6iatqKbXEGkR3lX6w7iwseQIvt+GI/Ec08hnNE16cXZyRbu3C3Hje45eOJ0mVZZNaupooKGUghHVQwJ06SCDyNyRb8MDMiCVNAXqo52NPeGaSFrXA+3frewviABjjuPXpMHvLj/xNmQUOWSZGj08UJy8wa3jRCZGbx36AHA582yXNaWty+jhlMrBo0pmU3a3Pblbrj3huepWlqqTL5xGhZqelaVLj3QxXxtYix8Sbg7WVMhR6DPnlYxxz00uylioLE29SDvttiWUMlYR7HKpQa+VzNuR6XHOcsqKvLzNXL2OcZeuqoAYapoOkm3Mrbf4+AwFnnnEIE0rSAe5cC4/Zhs4j4no6jPsorKaLSYH7GqDEnXE2zg+Itvfywt8TZecpzKsotikLXiI+1GbFd/Q7+hxrYx8sQe8crIy4fHKQQl6rYWk0j3lJsem2Bo94Ym1Pd1Lck2PyxBB3viyoQug5DGY3FgR4YzATKyPZjUSKzIAG33w8cKxxCdlm31U8ioWBOonf8sVzPnsVKfZqdO1qVcqxvdU38euHb6P6mepqYnnTvmQoGv7y2978QcEJCumYQSxZt2tNde0IN7bcv4YT/pNzGdZ8upXKl01SkL06Kbf5sWpmEP1d7bnk3UYpv6T1lfieNDuVpIwPO5Y/mcB36VJCCX8IVlELzpPJExeRVPd0328b+uDWV0UopkpMymkpqeqdVsg5gn7R6bDb0w5/R5ky0nDbCpoWNbKkrCMj9b4b9DsMduNcrq5chU09DJ2VwH0gHs1v89j4DGJLkOM2gbxff7rYbDjTNG4+r5W3DQgyfPPYqd9S6bBSN421W3tzuN8c+PstSqongpm3QmSWEgKGsdi3U22t5YBrW1nD2YGWSBuzkRVcspa5HOzHxAvbDZkMpz5ZcwcgTsShj5KB5789O/Owv8ADEQDmSbt6Uz8dkbbqggn0c5CsDyVEuhVjYEJIAduerntbp1w709VTyZ6I40BikuVZB3dh+e+F3MaZsqMUEz0q9uyq6Me6V5G3x3xtU8RJBWdi0R00xEXahQEB2HPy32xB5pXS7Ee1FPheVv5R49L3jWgR+IqYLaOKoZYp7Po1X638b28zgjNwnktTlr8Pwf+HneIS9vGLsNzuW63sRbCl9I1fHVvlSLK9TGCtSCg5gbLqO+9w37L8r4LD6RxHlcss4WDNqZWUU7qVQg2I8TqsNvXGlE0Vv8AKqNiyGsDbU+uyqDKcmolppGKoWNywZpGAs3La+29sK+VOKvil5zHJPeFmYpcm52v/PjgfxPxRU5ykEirJFdhdTLqAYrcm/Sw/PB/6No9My1NWNE+ghZZQR2i9dPw/DFTIjEZc8e+EY8J8cnnu/laZTwlSZ3Dms9dTl0edhGxBDr589jhY+kCkamhyuoJMkskD00jEWLNCQvzN74uHiGUZLRz1lBQVNWs3fkihIIBAABAJv06XxTvFMs1RwBlFVMp7SXM6pyLe7qLXHwP4Ytfh7ZhM/Y/TQpDMkErN6Vf1L631E3JS+Ip546znv28saW3xrrOC3DXAxmMTZBfwvjMBFGaPVHIDpOpd9huCP44feB8skpc6yupnfv+0Bjubrq/HqD8L4TMnXVmSLIWJDd/SMP/AA1PH+l8vVpXDPURsEW/VhtcdP59XCQp5nq4u1eN5AVjfSfJudj4HrituO4oqjjHLpJB9RPAq/5Wf94wz5zUGhzaukLsyM6hoeWoaRv49eY88KNbWNW1UVfmEQZKaRWI5qqMSNvQ6fXUcRyg6FT47w2QFWpw0Uo8vV5agCnUc5GCrGvr15YNK9I0KyUzoyAHsz2hCkHqPXxxTnFXFNLV5P8AoukZ3kEiszINrAG2/rbDDwvl00fDdMaesqJppCo9mD90XO9r/E8+mMPNJbGKPa0GY+zd3GlN+kary2HK3XSryNG8KaTut7WNuXT4YHcEZqIeDwaKngaqRWEcNQd3kHvW67jf5DET6SMkoqfLtcMfZTqdTKAAWJO5+NuWF/JM3lOVy04RIaimIHcHZnYCxIHXu8/LEeJQx7bzyrrYWODWXwUSq80nzBVhzyi9lK6BCpDFi1+RB5D+Iw4ZzRRvw8ksUCRwVMIe0jDWreHI/jfCWkQz/MFrKqQmzqWZRvYYeqOGsqMnlirYJVhRLxSG/eUgEWHTEGSBrTRyOfankaIQwk9FVhlJjfNaWhrqiQQltDor76bWsPC/LErjPJj7S1ZCNaoSki9opNlsCCQTv5Yiw0E1dxh2VAxZjKOTXVF6lj19MOfGGaUmTZjJlFZTzns4kmgWMLocFSDceurF9xkBDmC+FCM6KeQsHXP9oDlMPDhzijhMlR2zsGkRO9DfRqGom55jpiwcy7GRIxJITIIgyvEpUEjqoPLAvgGtyD9CTVCU1Ia3RZo2Qapfur1v93DY8MFVk18xWLvJa8m5G5sSTYgnbz8STvjpMfzN75VGWYslrmglt+M8pio5fbnBzGnhddCoRrNr2B87fPCD9IbLHwfw3T9l2TStNUvH929tvm5+WPc7ypv08aOmkE1QHRS4HNyB+/Eb6TaoT5+aNbtFlsCUoH9Ybsf2gfDF7FBPfoKLMZGxg098qup95D6Y1Hu2x1qlPafPHHri4s8Le3cHpjMegAqvpjMBMjmWyjtQrMb3G7bW9cP/AAZT+0cQUKU4LxxOkjnmFCnUSdtthitaAHtUBXqb+YP++Lb+jXTBFmWgbKsS3FrnUWJ/0DBSVyu3F8ZSvaSVSIpCpD/eIAFh57YEQUUNRSSUkqKkMpMZRGDWv+7Y/wA3J7jv63Jy3ePZzI4Cnfnb88COGqiGWGWIgKQNnI7u+GBtKQQeFXsSS5RWSx1QHtEElmAPO29x5HFlcEzZvllWkuYoxSWMNFDHbUSwFjbqbeY+OAvG/DNRW0zV9IQaqHuNEq7yLa/d6kjp5bdMTeBeNIa0RUucORVIFVH+/ba/kcZuXjbBbEOaDHqR6TLNllbmedyZnNTIaOPuCOViCXHLa3INa9/DFfZ9RIvGFctKQFmcMOytcM1r7eN+nni3KzMKSGkevbXojVS+glNdiCL3HQEHxwjQPRZjxwuYwujRFgzGKx3HInx9MUWs8DtR1X3UkMsksu9cAUnXJuGqSgjpXhg7SRY9ZlZiAx56SOnL+bYJ8QSVKZdTue5DIQWUb6TYaVJFweu/Lljg+efoyminEUkkEsyX1g91WNmYEXsOoGI/F1f2VNFIZ1jp9Y0DUCkpBuAQbgg4Scx+IgHl3HCrSRT5LgHe+lEyLJ6ShmlrbLGHBMkjbBR13xWXGddNxbxtPJSi1Oi+zxMxsGjW+59TqPxwW+kHiWHN4hDQwLAkA0yLfStzysBzO2FjLq/MaGnZ44lYRXdSQDY3sT8LdfPFiBjoovpNlWsTBERuTtMuW5dBlE1JFNJMsxkQEhQAC5A+Vz+OLJnljTLpmll7RZIu1USLbTpG5J9d8VVQZ0/sc9XV0s09W/d7QkqI1/qnpzxJWZs7dqWnr2hpUW0qvKxihjHMlid77/PCRbCw/lWcqESFruqUfKam0mY8WTKaeGljK08fRpmA0geJHP4YTzM85eZwxMjl5GfmxJvf54YeMMwUUdFluX00kGUUyGSEsovUNcjtCfgdum+AIhcxh+0tqXlbnfGzCwMbSwcmbyvv0glYyu5ZOW++InXEusBWwK2sG2+OIh53xIogu0Xurt0xmPY9kU/1T+IxmFTKfC/MqQdJ9MWr9HUgbKap7DU9QgLDe9lP/wCsU9Sy72O4w5ZNmtfR03Y5RJGuptbKRYk2A5/DHHgJR2rG4qgebh+vIBukXaeuk3wt8Mu5pU3ADS/aW916j4nHFcz4iraSWlrq2BYJx2Mg13JB2IAv5/txPpIoDRLSQtJGiEHtIm7zEG5HlyP8jBBNLjVpjpnLSHtHXVqCDblcbn9vj8euF7iXgxPanzXJCYasEmWEC2u97st9lPPY7YMwBqZyokcIygL4i2xPyxKp8yM0rQSX66FS5LLyueg3wa2FFLtqbCSMx4uY5U+StDJCbEPrQC1+Y8f98b8MTUscqeySRvIE1yRN3T8PH+OGDOsvoMxV0rKVHmH/ADRs4Hr8tjthOl4ZNLUdpTVIGk90E7j9/wA8UMjCLhQK18POiY3Uilbs00Ndww8kh+qdCeX2TiuuHUr82zGqiiCS5TRdxjKxAUX5C19/5uMDKnM84GWrQU1SVsmhhJcD5gEfM4n8A5tmvDVNVRPDTTw1D9oSZrENa1/MbYy2YErGPcRZ9BWG5TYQRE7s3/pa5rw7XUudCpCQNArEEWuAo6kHBjIpMuqMymh4kmgmkkKmMt9WqhTsLD488RM6zyqrEeNXpaZN1uWLm2/3tI6+OF2si/RU8NUlMtTLOpZKudxKr+OlR3QR1G9sTQYuRI0eXhNN+IR6/wCT8J040q6Kaikp6BIaamZu/UMdrW+wB7525DCVVV0VPQfo3LUaCh+2W3knP3nP/wBRiHW1tVUS9tWySTStb9YbaV8B4DyG2MVxbUTcdQF2t4XxqYuGyBtDtY8+W+UBvoIxlkIz/JajJJ49VVTFqrLm5Em31kQt4gah5g4W8xvHHF3t9Pof554KZVUyNm9ElAW7d6iMRlW72ssLcsDOOKiKbi/NEpmHs4qpNAUbe8eXxviwTSrgWl2ct2EZb7ht/mGIgwRr1IpkDAXCAfM/wxAVSRfHIrqm8YB6DbGY2jB7MHxGMwLTUpIyiuSRgac3U89QFt/XBihoK2MgMJIxa/ddd9/XyxMaN5NK3DMXk3br3iMa1EQ0OLhQW2YHmev5YiL7UoiRdZrQu8lWNbbWRFPha4v5DHUVcQmeaaQCYgAEpY2HTmMKMKN2n1qkLsbnqP5vjaSWONVYEE3I0ltyBywdqS+O07SPVLAsdPUKqgr3TIt2Hxa53+PzvjylStEiiNnLHusI1W7bbj3vTphCARbgMD2cZ6354wXUtuyuCbEGx93DbFDxJ2q1nWJYmSdHFwWEF7m/gD6Yg9tOCIo2nlHukCA+HQXwATVZizOSBcG/riNMHWKWUyPYHlqI6XxwkKBiCYC9QsTBqaoa4F7073/hgbVNMjD6me9/daMk3/m+Acc9VNIEeomZQ3IyE2x0EsvbSOs8wKgm4kN/xwxShqKGqqI9khCqu1jET+OCvD9euYFslr5uwiqmBgqGSyRVFtr+Ct7h+B6YXladjp9onKkhf1jbm/r4nGSiTRUku5syndjcXb92BabVSsyFZQ1stLWU9RTVMDFZIzGbj+Hn1xKyWkzTO5WTL4HEUY+tmlHZwxjxdzsPxwWpOKa8RJRZjTUGawwqBGcxpxM6eWs7kW6HELNM/wAxzgJTzypT0SEhKSkHZRDb7o8Ofwx2yXRSajNKLh+nmgyJ3rczlVo5c17PSkIYWIgXzH2zv4YVy5vvGS1gA2i2O1WjCMtEzCwXYG29j+7GSQMQwJOoPGvPx/2wLtHVcHhaWlPaLZi4sLG4UDEfsAQfIDfBR6faUbkSMbX+WI1TG6UpmBsVJU28mP5EYa0aUOBbxxXA3vzxmJVPAWgiYDbswfjj3CEi0w4TCXAkBBFu3ZT06nHWqWlp5AlZKhZbu0bNuqm1rjp8d8a5f/xNP74n+vEfjH+lz/3wf6cQabcWmncQ3hGaUZbWQLLlSxvLAArEb+gN8Qa6pq/0dWwtNNDWUshqAqS2tG22g28AVNjuLY04K/VQf3hP9eNMw/4pmf8AcZv+22IBbZC21RL3A9oHTZ9XEP7Q3tKKLuJAG2uB19cGKQZVmqdy1FO17Mh7tyPDp8MLFN/6j+7N+WJOV/q/icXtQpg9w5tE8xpKnKm7OpHdkuUkUnS48j8cDJpxJC++5tYX/nww0cSf+Vab+3X8DhKT9V8BhQFYuwt6fSZWA8eY8LYkggqEW9203/xXJ/LEOi95vT8xiVS/rB/g/DDntIOlJUG8LL/7hO3XvX/LHi3WjZSbl5O9597G9NypPU49j/oo/tR/qwE54UpbLNI3/wASm58z/DHOBS0cLXF+1N7+XQ46vzl/sV/E41o+Tf2j/wCrHIKK07yRtG8aoY2BuDzx68jNBOLfWNoJPS6nbbGT+83/AFL+Jx4Pt+g/PBrhD2psssUl+zaxJOkEeLC37cD8yIFLMAD3rH43U/vxv0P+H/uDHGu/ob+n5DHDtcelJoQfYacnlpscZjpQf8Nh/s/zGMxH2U46C//Z',
  //         [
  //           new Ingredient('Meat',1),
  //           new Ingredient('Fries',20)
  //         ]),
  //       new Recipe(
  //         'Burger',
  //         'a test',
  //         'data:image/jpeg;base64,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',
  //         [
  //           new Ingredient('Buns',2)
  //         ])
    
  //     ];
      private recipes: Recipe[] =[];
      constructor( private slService:ShoppingListService){}

      setRecipes(recipes: Recipe[]){
        this.recipes= recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
      getRecipes(){
        return this.recipes.slice();
      }
      getRecipe(index:number){
        return this.recipes[index];
      }
      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}
