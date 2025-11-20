(function (global) {
    const { ref, reactive, nextTick } = Vue;

    function notifyParent(message, level = 'info') {
        if (global.parent && global.parent !== global) {
            global.parent.postMessage(
                {
                    type: 'toast',
                    payload: { message, level }
                },
                '*'
            );
            return;
        }

        if (global.ElementPlus?.ElMessage) {
            global.ElementPlus.ElMessage({
                message,
                type: level,
                duration: 2000
            });
            return;
        }

        try {
            console.info(`[${level}] ${message}`);
        } catch (err) {
            // ignore console errors
        }
    }

    function useQRCode() {
        const dialogVisible = ref(false);
        const currentTarget = ref(null);

        const open = (target) => {
            currentTarget.value = target;
            dialogVisible.value = true;
        };

        const close = () => {
            dialogVisible.value = false;
        };

        const getQRCodePayload = () => {
            if (!currentTarget.value) return '';
            return JSON.stringify(
                {
                    type: 'fire-safety',
                    id: currentTarget.value.id,
                    name: currentTarget.value.name,
                    timestamp: Date.now()
                },
                null,
                2
            );
        };

        return {
            dialogVisible,
            currentTarget,
            open,
            close,
            getQRCodePayload
        };
    }

    function useVideoPreview() {
        const drawerVisible = ref(false);
        const playingSource = ref(null);
        const history = ref([
            {
                id: 'v001',
                title: '现场巡检回放 2024-11-01 10:20',
                duration: '02:18',
                url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
            },
            {
                id: 'v002',
                title: '设备自检录像 2024-10-26 09:05',
                duration: '01:12',
                url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
            }
        ]);

        const open = (item) => {
            drawerVisible.value = true;
            playingSource.value =
                item?.videoUrl ||
                'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
        };

        const close = () => {
            drawerVisible.value = false;
        };

        const playHistory = (video) => {
            playingSource.value = video.url;
        };

        return {
            drawerVisible,
            playingSource,
            history,
            open,
            close,
            playHistory
        };
    }

    function useSignaturePad() {
        const drawerVisible = ref(false);
        const canvasRef = ref(null);
        const signatures = ref([]);

        const state = reactive({
            drawing: false,
            context: null,
            lastX: 0,
            lastY: 0
        });

        const getCanvas = () => canvasRef.value;

        const resizeCanvas = () => {
            const canvas = getCanvas();
            if (!canvas) return;
            const ratio = global.devicePixelRatio || 1;
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            const ctx = canvas.getContext('2d');
            ctx.scale(ratio, ratio);
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = '#1f6feb';
            state.context = ctx;
        };

        const open = () => {
            drawerVisible.value = true;
            nextTick(() => {
                resizeCanvas();
            });
        };

        const close = () => {
            drawerVisible.value = false;
        };

        const startDrawing = (event) => {
            event.preventDefault();
            const { offsetX, offsetY } = getPointerPosition(event);
            state.drawing = true;
            state.lastX = offsetX;
            state.lastY = offsetY;
        };

        const draw = (event) => {
            if (!state.drawing || !state.context) return;
            event.preventDefault();
            const { offsetX, offsetY } = getPointerPosition(event);
            state.context.beginPath();
            state.context.moveTo(state.lastX, state.lastY);
            state.context.lineTo(offsetX, offsetY);
            state.context.stroke();
            state.lastX = offsetX;
            state.lastY = offsetY;
        };

        const endDrawing = (event) => {
            if (!state.drawing) return;
            event.preventDefault();
            state.drawing = false;
        };

        const getPointerPosition = (event) => {
            const canvas = getCanvas();
            const rect = canvas.getBoundingClientRect();
            if (event.touches && event.touches.length > 0) {
                const touch = event.touches[0];
                return {
                    offsetX: touch.clientX - rect.left,
                    offsetY: touch.clientY - rect.top
                };
            }
            if (event.changedTouches && event.changedTouches.length > 0) {
                const touch = event.changedTouches[0];
                return {
                    offsetX: touch.clientX - rect.left,
                    offsetY: touch.clientY - rect.top
                };
            }
            return {
                offsetX: event.offsetX,
                offsetY: event.offsetY
            };
        };

        const clearSignature = () => {
            const canvas = getCanvas();
            if (!canvas || !state.context) return;
            state.context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        };

        const saveSignature = () => {
            const canvas = getCanvas();
            if (!canvas) return;
            const dataURL = canvas.toDataURL('image/png');
            signatures.value.unshift({
                id: `sig-${Date.now()}`,
                url: dataURL,
                time: new Date().toLocaleString()
            });
            notifyParent('签名已保存', 'success');
            clearSignature();
        };

        return {
            drawerVisible,
            canvasRef,
            signatures,
            open,
            close,
            startDrawing,
            draw,
            endDrawing,
            clearSignature,
            saveSignature,
            resizeCanvas
        };
    }

    global.MobileShared = {
        useQRCode,
        useVideoPreview,
        useSignaturePad,
        notifyParent
    };
})(window);

