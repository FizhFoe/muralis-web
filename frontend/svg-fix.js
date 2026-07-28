import fs from "fs";
import path from "path";

const ICONS_FOLDER = "./src/assets/icons";

function cleanSvg(svg) {
    // Remove XML e DOCTYPE
    svg = svg.replace(/<\?xml[\s\S]*?\?>/g, "");
    svg = svg.replace(/<!DOCTYPE[\s\S]*?>/g, "");

    // Remove atributos desnecessários do Affinity/Illustrator
    svg = svg.replace(/\s+xmlns:serif="[^"]*"/g, "");
    svg = svg.replace(/\s+serif:id="[^"]*"/g, "");
    svg = svg.replace(/\s+xml:space="[^"]*"/g, "");
    svg = svg.replace(/\s+xmlns:xlink="[^"]*"/g, "");

    // Remove grupos vazios
    svg = svg.replace(/<g[^>]*>\s*<\/g>/g, "");

    // Remove o rect invisível
    svg = svg.replace(/<rect[^>]*fill:none;?[^>]*\/>/g, "");

    // Converte stroke-width em style para atributo
    svg = svg.replace(
        /style="([^"]*?)stroke-width:([\d.]+)px;?([^"]*?)"/g,
        (_, before, width, after) => {
            let style = `${before}${after}`
                .replace(/;;+/g, ";")
                .replace(/^;/, "")
                .replace(/;$/, "");

            if (style.trim()) {
                return `style="${style}" stroke-width="2"`;
            }

            return `stroke-width="1"`;
        }
    );

    // Qualquer stroke-width existente passa para 2
    svg = svg.replace(
        /stroke-width="[\d.]+"/g,
        'stroke-width="1"'
    );

    // currentColor
    svg = svg.replace(/stroke:#?[0-9A-Fa-f]{3,6}/g, "stroke:currentColor");

    return svg;
}

function walk(folder) {
    const files = fs.readdirSync(folder);

    for (const file of files) {
        const filePath = path.join(folder, file);

        if (fs.statSync(filePath).isDirectory()) {
            walk(filePath);
            continue;
        }

        if (!file.endsWith(".svg")) continue;

        const svg = fs.readFileSync(filePath, "utf8");

        fs.writeFileSync(filePath, cleanSvg(svg));
    }
}

walk(ICONS_FOLDER);