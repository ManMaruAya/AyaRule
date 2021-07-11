let $ = nobyda();
let run = EnvInfo();

async function SwitchRegion(play) {
	const Group = $.read('BiliArea_Policy') || '哔哩哔哩'; //Your blibli policy group name.
	const CN = $.read('BiliArea_CN') || 'DIRECT'; //Your China sub-policy name.
	const TW = $.read('BiliArea_TW') || '台湾'; //Your Taiwan sub-policy name.
	const HK = $.read('BiliArea_HK') || '香港'; //Your HongKong sub-policy name.
	const current = await $.getPolicy(Group);
	const area = (() => {
		if (/\u50c5[\u4e00-\u9fa5]+\u6e2f|%20%E6%B8%AF&/.test(play)) {
			if (current != HK) return HK;
		} else if (/\u50c5[\u4e00-\u9fa5]+\u53f0|%20%E5%8F%B0&/.test(play)) {
			if (current != TW) return TW;
		} else if (current != CN) return CN;
	})()

	if (area) {
		const change = await $.setPolicy(Group, area);
		const notify = $.read('BiliAreaNotify') === 'true';
		const msg = SwitchStatus(change, current, area);
		if (!notify) {
			$.notify(/^http/.test(play) || !play ? `` : play, ``, msg);
		} else {
			console.log(`${/^http/.test(play)||!play?``:play}\n${msg}`);
		}
		if (change) {
			return true;
		}
	}
	return false;
}

function SwitchStatus(status, original, newPolicy) {
	if (status) {
		return `${original}  =>  ${newPolicy}  =>  🟢`;
	} else if (original === 2) {
		return `切换失败, 策略组名未填写或填写有误 ⚠️`
	} else if (original === 3) {
		return `切换失败, 不支持您的VPN应用版本 ⚠️`
	} else if (status === 0) {
		return `切换失败, 子策略名未填写或填写有误 ⚠️`
	} else {
		return `策略切换失败, 未知错误 ⚠️`
	}
}
