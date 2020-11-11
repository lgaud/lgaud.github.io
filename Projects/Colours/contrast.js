function createContrastMatrix(colours) {
    let matrix = []
    let num_colors = colours.length
    for (let i = 0; i < num_colors; i++) {
        row = []
        for (let j = 0; j < num_colors; j++) {
            row.push(chroma.contrast(colours[i], colours[j])) 
        }
        matrix.push(row)
    }
    return matrix
}

// https://stackoverflow.com/questions/46622486/what-is-the-javascript-equivalent-of-numpy-argsort
let dsu = (arr1, arr2) => arr1
    .map((item, index) => [arr2[index], item]) // add the args to sort by
    .sort(([arg1], [arg2]) => arg2 - arg1) // sort by the args
    .map(([, item]) => item); // extract the sorted items

function findHighContrastOrder(colours) {
    // Sort by luminance, then interleave to achieve a high contrast ordering of the colours
    // EVEN: Lightest colour first
    // ODD: Middle colour first

    luminance = colours.map(c => chroma(c).luminance())

    coloursByLuminance = dsu(colours, luminance)
    midpoint = Math.floor(coloursByLuminance.length / 2)
    
    interleaved = []

    if (coloursByLuminance.length % 2 != 0) {
        interleaved.push(coloursByLuminance[midpoint])
        midpoint += 1
    }

    for (let offset = 0; offset < Math.floor(coloursByLuminance.length / 2); offset++) {
        interleaved.push(coloursByLuminance[offset])
        interleaved.push(coloursByLuminance[midpoint + offset])
    }

    return interleaved
}

function displayContrastMatrix(colours, contrast_matrix, element) {
    highContrast = 3

    mediumContrast = 2.5


    num_colors = contrast_matrix.length
    table = document.createElement("table")
    tableRow = document.createElement("tr")
    table.appendChild(tableRow)
    element.innerHTML = ""
    element.appendChild(table)
    empty = document.createElement("td")
    tableRow.appendChild(empty)

    for (let i = 0; i < num_colors; i++) {
        th = document.createElement("th")
        th.scope = "col"
        th.textContent = colours[i]
        th.style.backgroundColor = colours[i]
        th.style.color = bestTextColor(colours[i])
        tableRow.appendChild(th)
    }


    for (let i = 0; i < num_colors; i++) {      

        row = document.createElement("tr")
        titleBlock = document.createElement("th")
        titleBlock.textContent = colours[i]
        titleBlock.style.backgroundColor = colours[i]
        titleBlock.style.color = bestTextColor(colours[i])
        titleBlock.scope = "row"
        row.appendChild(titleBlock)
        for (let j = 0; j < num_colors; j++) {

            block = document.createElement("td")
            contrast = contrast_matrix[i][j]
            if (contrast >= highContrast) {
                block.classList.add("highContrast");
            }
            else if (contrast >= mediumContrast) {
                block.classList.add("moderateContrast");
            }
            else {
                block.classList.add("lowContrast");
            }

            block.textContent = contrast.toPrecision(3)
            row.appendChild(block)

        }
        table.appendChild(row)
    }
}

function bestTextColor(backgroundColor, textColors) {
    if (textColors === undefined) {
        textColors = ["#000000", "#FFFFFF"]
    }

    maxContrast = 0
    maxContrastColor = textColors[0]
    idealContrast = 7 // WCAG AAA
    numColors = textColors.length
    for (let i = 0; i < numColors; i++) {
        contrast = chroma.contrast(textColors[i], backgroundColor)
        if (contrast >= idealContrast) {
            return textColors[i]
        }
        else if (contrast >= maxContrast) {
            maxContrast = contrast
            maxContrastColor = textColors[i]
        }
    }
    return maxContrastColor
}