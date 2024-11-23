const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Behaviors.Platform,
		C3.Behaviors.solid,
		C3.Plugins.TiledBg,
		C3.Plugins.Keyboard,
		C3.Plugins.Text,
		C3.Plugins.HTMLElement,
		C3.Plugins.Camera3D,
		C3.Behaviors.Physics,
		C3.Plugins.Sprite.Cnds.OnCollision,
		C3.Plugins.System.Acts.SetVar,
		C3.Plugins.Sprite.Acts.SetVisible,
		C3.Plugins.Sprite.Acts.SetCollisions,
		C3.Plugins.Sprite.Acts.MoveForward,
		C3.Plugins.System.Acts.Wait,
		C3.Plugins.System.Cnds.CompareVar,
		C3.Plugins.System.Cnds.EveryTick,
		C3.Behaviors.Physics.Acts.SetVelocity
	];
};
self.C3_JsPropNameTable = [
	{GameReset: 0},
	{NewLevelActive: 0},
	{Platform: 0},
	{Solid: 0},
	{Sprite: 0},
	{TiledBackground: 0},
	{Sprite2: 0},
	{Keyboard: 0},
	{Sprite6: 0},
	{Sprite4: 0},
	{Sprite5: 0},
	{Text: 0},
	{HTMLElement: 0},
	{Sprite3: 0},
	{"3DCamera": 0},
	{Sprite7: 0},
	{Sprite8: 0},
	{Sprite9: 0},
	{Physics: 0},
	{Sprite10: 0}
];

self.InstanceType = {
	Sprite: class extends self.ISpriteInstance {},
	TiledBackground: class extends self.ITiledBackgroundInstance {},
	Sprite2: class extends self.ISpriteInstance {},
	Keyboard: class extends self.IInstance {},
	Sprite6: class extends self.ISpriteInstance {},
	Sprite4: class extends self.ISpriteInstance {},
	Sprite5: class extends self.ISpriteInstance {},
	Text: class extends self.ITextInstance {},
	HTMLElement: class extends self.IHTMLElementInstance {},
	Sprite3: class extends self.ISpriteInstance {},
	_3DCamera: class extends self.IInstance {},
	Sprite7: class extends self.ISpriteInstance {},
	Sprite8: class extends self.ISpriteInstance {},
	Sprite9: class extends self.ISpriteInstance {},
	Sprite10: class extends self.ISpriteInstance {}
}