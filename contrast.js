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

function findHighestContrastOrder(colours, contrastMatrix) {
    // Given the list of colours
    // I want the ordering that maximizes the lowest contrast between adjacent pairs
    // The contrast ratio is a property of two colours
    // A and B have a contrast ratio, the contrast ratio of the next choice is dependent on the other available colours and B
    // Brute force: Calculate every possible ordering
    // Dynamic programming: Every possible 2 ordering, every possible 3 ordering, etc. -> Every possible ordering will have sub problem repetitions
    // How do I store this sub result? The best possible 3 ordering may be a sub optimal N ordering
    // Generic problem: The contrast is a distance between two colours. I want to maximize the smallest distance between adjacent points.
    // But is it a distance between N colours? Triangle inequality?
    // https://cs.stackexchange.com/questions/22767/choosing-a-subset-to-maximize-the-minimum-distance-between-points
    // https://math.stackexchange.com/questions/339649/maximizing-distance-between-points
    // Graph?
}


function findBestPairs(colours, contrastMatrix) {
    
    let numColors = colours.length
    for (let r = 0; r < numColors; r++) {
        row_colours_sorted = dsu(colours, contrastMatrix[r])
        console.log(row_colours_sorted)
    }

    // Return tuples of colours sorted from highest contrast to lowest contrast
}

function displayContrastMatrix(colours, contrast_matrix, element) {

    num_colors = contrast_matrix.length
    table = document.createElement("table")
    tableRow = document.createElement("tr")
    table.appendChild(tableRow)

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
            block.backgroundColor = colours[i]
            block.textContent = contrast_matrix[i][j].toPrecision(3)
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