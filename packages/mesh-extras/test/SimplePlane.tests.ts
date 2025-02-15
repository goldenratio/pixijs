import type { PlaneGeometry } from '@pixi/mesh-extras';
import { SimplePlane } from '@pixi/mesh-extras';
import { skipHello } from '@pixi/utils';
import { Loader } from '@pixi/loaders';
import { Point } from '@pixi/math';
import { Renderer, BatchRenderer, RenderTexture, Texture, extensions } from '@pixi/core';

skipHello();

// TODO: fix with webglrenderer
describe('SimplePlane', () =>
{
    it('should create a plane from an external image', (done) =>
    {
        const loader = new Loader();

        loader.add('testBitmap', `file://${__dirname}/resources/bitmap-1.png`)
            .load((_loader, resources) =>
            {
                const plane = new SimplePlane(resources.testBitmap.texture, 100, 100);

                expect((plane.geometry as PlaneGeometry).segWidth).toEqual(100);
                expect((plane.geometry as PlaneGeometry).segHeight).toEqual(100);
                done();
            });
    });

    it('should create a new empty textured SimplePlane', () =>
    {
        const plane = new SimplePlane(Texture.EMPTY, 100, 100);

        expect((plane.geometry as PlaneGeometry).segWidth).toEqual(100);
        expect((plane.geometry as PlaneGeometry).segHeight).toEqual(100);
    });

    describe('containsPoint', () =>
    {
        it('should return true when point inside', () =>
        {
            const point = new Point(10, 10);
            const texture = RenderTexture.create({ width: 20, height: 30 });
            const plane = new SimplePlane(texture, 100, 100);

            expect(plane.containsPoint(point)).toBe(true);
        });

        it('should return false when point outside', () =>
        {
            const point = new Point(100, 100);
            const texture = RenderTexture.create({ width: 20, height: 30 });
            const plane = new SimplePlane(texture, 100, 100);

            expect(plane.containsPoint(point)).toBe(false);
        });
    });

    it('should render the plane', () =>
    {
        extensions.add(BatchRenderer);

        const renderer = new Renderer();
        const plane = new SimplePlane(Texture.WHITE, 100, 100);

        renderer.render(plane);

        plane.destroy();
        renderer.destroy();

        extensions.remove(BatchRenderer);
    });
});
