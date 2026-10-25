(function (window) {
    const random = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

    const bezier = (cp, t) => {
        const p1 = cp[0].mul((1 - t) * (1 - t));
        const p2 = cp[1].mul(2 * t * (1 - t));
        const p3 = cp[2].mul(t * t);
        return p1.add(p2).add(p3);
    };

    const inheart = (x, y, r) => {
        const z = ((x / r) * (x / r) + (y / r) * (y / r) - 1) ** 3 - (x / r) * (x / r) * (y / r) * (y / r) * (y / r);
        return z < 0;
    };

    class Point {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        clone() {
            return new Point(this.x, this.y);
        }
        add(o) {
            const p = this.clone();
            p.x += o.x;
            p.y += o.y;
            return p;
        }
        sub(o) {
            const p = this.clone();
            p.x -= o.x;
            p.y -= o.y;
            return p;
        }
        div(n) {
            const p = this.clone();
            p.x /= n;
            p.y /= n;
            return p;
        }
        mul(n) {
            const p = this.clone();
            p.x *= n;
            p.y *= n;
            return p;
        }
    }

    class Heart {
        constructor() {
            this.points = [];
            for (let i = 10; i < 30; i += 0.2) {
                const t = i / Math.PI;
                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
                this.points.push(new Point(x, y));
            }
            this.length = this.points.length;
        }
        get(i, scale = 1) {
            return this.points[i].mul(scale);
        }
    }

    class Seed {
        constructor(tree, point, scale = 1, color = '#FF0000') {
            this.tree = tree;
            this.heart = {
                point: point,
                scale: scale,
                color: color,
                figure: new Heart(),
            };
            this.cirle = {
                point: point,
                scale: scale,
                color: color,
                radius: 5,
            };
        }
        draw() {
            this.drawHeart();
            this.drawText();
        }
        addPosition(x, y) {
            this.cirle.point = this.cirle.point.add(new Point(x, y));
        }
        canMove() {
            return this.cirle.point.y < (this.tree.height + 20);
        }
        move(x, y) {
            this.clear();
            this.drawCirle();
            this.addPosition(x, y);
        }
        canScale() {
            return this.heart.scale > 0.2;
        }
        setHeartScale(scale) {
            this.heart.scale *= scale;
        }
        scale(scale) {
            this.clear();
            this.drawCirle();
            this.drawHeart();
            this.setHeartScale(scale);
        }
        drawHeart() {
            const ctx = this.tree.ctx;
            const { point, color, scale, figure } = this.heart;
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (let i = 0; i < figure.length; i++) {
                const p = figure.get(i, scale);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        drawCirle() {
            const ctx = this.tree.ctx;
            const { point, color, scale, radius } = this.cirle;
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        drawText() {
            const ctx = this.tree.ctx;
            const { point, color, scale } = this.heart;
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.moveTo(0, 0);
            ctx.lineTo(15, 15);
            ctx.lineTo(60, 15);
            ctx.stroke();

            ctx.moveTo(0, 0);
            ctx.scale(0.75, 0.75);
            ctx.font = "12px 微软雅黑,Verdana";
            ctx.fillText("Click here", 23, 10);
            ctx.restore();
        }
        clear() {
            const ctx = this.tree.ctx;
            const { point, scale } = this.cirle;
            const radius = 26;
            const w = radius * scale;
            const h = radius * scale;
            ctx.clearRect(point.x - w, point.y - h, 4 * w, 4 * h);
        }
        hover(x, y) {
            const ctx = this.tree.ctx;
            const pixel = ctx.getImageData(x, y, 1, 1);
            return pixel.data[3] === 255;
        }
    }

    class Footer {
        constructor(tree, width, height, speed = 2) {
            this.tree = tree;
            this.point = new Point(tree.seed.heart.point.x, tree.height - height / 2);
            this.width = width;
            this.height = height;
            this.speed = speed;
            this.length = 0;
        }
        draw() {
            const ctx = this.tree.ctx;
            const point = this.point;
            const len = this.length / 2;

            ctx.save();
            const footerOpt = this.tree.opt && this.tree.opt.footer;
            const explicitColor = footerOpt && footerOpt.color;
            if (explicitColor) {
                ctx.strokeStyle = explicitColor;
            } else {
                // Soft poetic watercolor mist gradient harmonizing with Vietnamese Dó paper and countryside
                // Center matches rustic wood trunk hue, fading smoothly into young rice green and soft transparency
                const grad = ctx.createLinearGradient(-len, 0, len, 0);
                grad.addColorStop(0, 'rgba(106, 141, 115, 0)');
                grad.addColorStop(0.15, 'rgba(106, 141, 115, 0.22)');
                grad.addColorStop(0.5, 'rgba(74, 55, 40, 0.32)');
                grad.addColorStop(0.85, 'rgba(106, 141, 115, 0.22)');
                grad.addColorStop(1, 'rgba(106, 141, 115, 0)');
                ctx.strokeStyle = grad;
            }
            ctx.lineWidth = this.height;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(len, 0);
            ctx.lineTo(-len, 0);
            ctx.stroke();
            ctx.restore();

            if (this.length < this.width) {
                this.length += this.speed;
            }
        }
    }

    class Tree {
        constructor(canvas, width, height, opt = {}) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.width = width;
            this.height = height;
            this.opt = opt;
            this.record = {};

            this.initSeed();
            this.initFooter();
            this.initBranch();
            this.initBloom();
        }
        initSeed() {
            const seed = this.opt.seed || {};
            const x = seed.x || this.width / 2;
            const y = seed.y || this.height / 2;
            const point = new Point(x, y);
            const color = seed.color || '#FF0000';
            const scale = seed.scale || 1;
            this.seed = new Seed(this, point, scale, color);
        }
        initFooter() {
            const footer = this.opt.footer || {};
            const width = footer.width || this.width;
            const height = footer.height || 5;
            const speed = footer.speed || 2;
            this.footer = new Footer(this, width, height, speed);
        }
        initBranch() {
            const branchs = this.opt.branch || [];
            this.branchs = [];
            this.addBranchs(branchs);
        }
        initBloom() {
            const bloom = this.opt.bloom || {};
            const cache = [];
            const num = bloom.num || 500;
            const width = bloom.width || this.width;
            const height = bloom.height || this.height;
            const figure = this.seed.heart.figure;
            const r = 240;

            for (let i = 0; i < num; i++) {
                cache.push(this.createBloom(width, height, r, figure));
            }
            this.blooms = [];
            this.bloomsCache = cache;
        }
        toDataURL(type) {
            return this.canvas.toDataURL(type);
        }
        draw(k) {
            const rec = this.record[k];
            if (!rec) return;
            const { point, image } = rec;
            this.ctx.save();
            this.ctx.putImageData(image, point.x, point.y);
            this.ctx.restore();
        }
        addBranch(branch) {
            this.branchs.push(branch);
        }
        addBranchs(branchs) {
            for (let i = 0; i < branchs.length; i++) {
                const b = branchs[i];
                const p1 = new Point(b[0], b[1]);
                const p2 = new Point(b[2], b[3]);
                const p3 = new Point(b[4], b[5]);
                const r = b[6];
                const l = b[7];
                const c = b[8];
                this.addBranch(new Branch(this, p1, p2, p3, r, l, c));
            }
        }
        removeBranch(branch) {
            const idx = this.branchs.indexOf(branch);
            if (idx > -1) this.branchs.splice(idx, 1);
        }
        canGrow() {
            return !!this.branchs.length;
        }
        grow() {
            for (let i = 0; i < this.branchs.length; i++) {
                if (this.branchs[i]) {
                    this.branchs[i].grow();
                }
            }
        }
        addBloom(bloom) {
            this.blooms.push(bloom);
        }
        removeBloom(bloom) {
            const idx = this.blooms.indexOf(bloom);
            if (idx > -1) this.blooms.splice(idx, 1);
        }
        createBloom(width, height, radius, figure, color, alpha, angle, scale, place, speed) {
            while (true) {
                const x = random(20, width - 20);
                const y = random(20, height - 20);
                if (inheart(x - width / 2, height - (height - 40) / 2 - y, radius)) {
                    return new Bloom(this, new Point(x, y), figure, color, alpha, angle, scale, place, speed);
                }
            }
        }
        canFlower() {
            return !!this.blooms.length;
        }
        flower(num) {
            const blooms = this.bloomsCache.splice(0, num);
            for (let i = 0; i < blooms.length; i++) {
                this.addBloom(blooms[i]);
            }
            for (let j = 0; j < this.blooms.length; j++) {
                this.blooms[j].flower();
            }
        }
        snapshot(k, x, y, width, height) {
            const image = this.ctx.getImageData(x, y, width, height);
            this.record[k] = {
                image: image,
                point: new Point(x, y),
                width: width,
                height: height
            };
        }
        setSpeed(k, speed) {
            this.record[k || "move"].speed = speed;
        }
        move(k, x, y) {
            const rec = this.record[k || "move"];
            const { image, width, height } = rec;
            let point = rec.point;
            let speed = rec.speed || 10;

            const i = point.x + speed < x ? point.x + speed : x;
            const j = point.y + speed < y ? point.y + speed : y;

            this.ctx.save();
            this.ctx.clearRect(point.x, point.y, width, height);
            this.ctx.putImageData(image, i, j);
            this.ctx.restore();

            rec.point = new Point(i, j);
            rec.speed = speed * 0.95;
            if (rec.speed < 2) rec.speed = 2;

            return i < x || j < y;
        }
        jump() {
            if (this.blooms.length) {
                for (let i = 0; i < this.blooms.length; i++) {
                    this.blooms[i].jump();
                }
            }
            if ((this.blooms.length && this.blooms.length < 3) || !this.blooms.length) {
                const bloom = this.opt.bloom || {};
                const width = bloom.width || this.width;
                const height = bloom.height || this.height;
                const figure = this.seed.heart.figure;
                const r = 240;
                for (let i = 0; i < random(1, 2); i++) {
                    this.blooms.push(this.createBloom(width / 2 + width, height, r, figure, null, 1, null, 1, new Point(random(-100, 600), 720), random(200, 300)));
                }
            }
        }
    }

    class Branch {
        constructor(tree, point1, point2, point3, radius, length = 100, branchs = []) {
            this.tree = tree;
            this.point1 = point1;
            this.point2 = point2;
            this.point3 = point3;
            this.radius = radius;
            this.length = length;
            this.len = 0;
            this.t = 1 / (this.length - 1);
            this.branchs = branchs;
        }
        grow() {
            if (this.len <= this.length) {
                const p = bezier([this.point1, this.point2, this.point3], this.len * this.t);
                this.draw(p);
                this.len += 1;
                this.radius *= 0.97;
            } else {
                this.tree.removeBranch(this);
                this.tree.addBranchs(this.branchs);
            }
        }
        draw(p) {
            const ctx = this.tree.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = 'rgb(35, 31, 32)';
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    class Bloom {
        constructor(tree, point, figure, color, alpha, angle, scale = 0.1, place, speed) {
            this.tree = tree;
            this.point = point;
            this.color = color || `rgb(255,${random(0, 255)},${random(0, 255)})`;
            this.alpha = alpha || random(0.3, 1);
            this.angle = angle || random(0, 360);
            this.scale = scale;
            this.place = place;
            this.speed = speed;
            this.figure = figure;
        }
        setFigure(figure) {
            this.figure = figure;
        }
        flower() {
            this.draw();
            this.scale += 0.1;
            if (this.scale > 1) {
                this.tree.removeBloom(this);
            }
        }
        draw() {
            const ctx = this.tree.ctx;
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.point.x, this.point.y);
            ctx.scale(this.scale, this.scale);
            ctx.rotate(this.angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (let i = 0; i < this.figure.length; i++) {
                const p = this.figure.get(i);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
        jump() {
            const height = this.tree.height;
            if (this.point.x < -20 || this.point.y > height + 20) {
                this.tree.removeBloom(this);
            } else {
                this.draw();
                this.point = this.place.sub(this.point).div(this.speed).add(this.point);
                this.angle += 0.05;
                this.speed -= 1;
            }
        }
    }

    window.random = random;
    window.bezier = bezier;
    window.Point = Point;
    window.Tree = Tree;

})(window);
