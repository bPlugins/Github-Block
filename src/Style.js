
import { getBoxValue } from './Const/functions';
import { getBackgroundCSS, getBorderCSS, getTypoCSS, getColorsCSS } from '../../Components/Helper/getCSS';
const Style = ({ attributes, clientId }) => {
	const { columnGap, rowGap, wrapperBgColor, wrapperPadding, cardBackground, cardPadding, cardBorder, nameTypo, nameColor, descTypo, descColor, downloadBtnTypo, downloadBtnColor, downloadBtnPadding, downloadBtnBorder, paginationBtnTypo, paginationBtnColor, paginationBtnActiveTypo, paginationBtnActiveColor, paginationBtnBorder, modalBtnTypo, modalBtnColors, modalBtnHoverColors, modalBtnBorder, modalBtnHoverBorder, modalBtnPadding } = attributes;

	const MainEl = `#ghbMainArea-${clientId}`;
	const mainSection = `${MainEl} .ghbSectionArea`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', nameTypo)?.googleFontLink}
		${getTypoCSS('', descTypo)?.googleFontLink}
		${getTypoCSS('', downloadBtnTypo)?.googleFontLink}
		${getTypoCSS('', paginationBtnTypo)?.googleFontLink}
		${getTypoCSS('', paginationBtnActiveTypo)?.googleFontLink}
		${getTypoCSS('', modalBtnTypo)?.googleFontLink}
		${getTypoCSS(`${mainSection} .ghbSingleRepoCard .name`, nameTypo)?.styles}
		${getTypoCSS(`${mainSection} .ghbSingleRepoCard .desc`, descTypo)?.styles}
		${getTypoCSS(`${mainSection} .ghbSingleRepoCard .download`, downloadBtnTypo)?.styles}
		${getTypoCSS(`${mainSection} .ghbSingleRepoCard .topic`, downloadBtnTypo)?.styles}
		${getTypoCSS(`${mainSection} .pagination button`, paginationBtnTypo)?.styles}
		${getTypoCSS(`${mainSection} .pagination .active`, paginationBtnActiveTypo)?.styles}
		${getTypoCSS(`${mainSection} .modalSection button`, modalBtnTypo)?.styles}
		
		${mainSection} {
			${getBackgroundCSS(wrapperBgColor)};
			padding:${getBoxValue(wrapperPadding)};
		}

		${MainEl} .ghbMainArea{
			grid-gap: ${rowGap} ${columnGap};	 
		}

		${mainSection} .ghbSingleRepo .ghbSingleRepoCard{
			${getBackgroundCSS(cardBackground)};
			padding:${getBoxValue(cardPadding)};
			${getBorderCSS(cardBorder)};
		}

		${mainSection} .ghbSingleRepoCard .name {
			color:${nameColor};
		}
		${mainSection} .ghbSingleRepoCard .desc {
			color:${descColor};
		}
		${mainSection} .ghbSingleRepoCard .download,
		${mainSection} .ghbSingleRepoCard .topic {
			${getColorsCSS(downloadBtnColor)};
			padding:${getBoxValue(downloadBtnPadding)};
			${getBorderCSS(downloadBtnBorder)};
		}

		${mainSection} .pagination button { 
			${getColorsCSS(paginationBtnColor)};
			${getBorderCSS(paginationBtnBorder)};
		}

		${mainSection} .pagination .active { 
			${getColorsCSS(paginationBtnActiveColor)};
		}

		${mainSection} .modalSection button {
			${getColorsCSS(modalBtnColors)};
			${getBorderCSS(modalBtnBorder)};
			padding:${getBoxValue(modalBtnPadding)};
		}

		${mainSection} .modalSection button:hover {
			${getBorderCSS(modalBtnHoverBorder)};
		}

		${mainSection} .modalSection > button.button--nina::after {
			${getColorsCSS(modalBtnHoverColors)};
		}

		`.replace(/\s+/g, ' ')
	}} />;
}
export default Style;