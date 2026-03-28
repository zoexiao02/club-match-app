document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();

    const pages = {
        cover: document.getElementById('page-cover'),
        result: document.getElementById('page-result')
    };
    
    const container = document.getElementById('questions-container');

    // Define the story-line questions (Fully Localized to Chinese)
    const questions = [
        {
            id: 1,
            bg: 'var(--c-mustard)', // Muted yellow
            title: "在没有课的闲暇周末下午，你通常会选择如何度过？",
            options: [
                { text: "泡在安静的独立咖啡馆，沉浸在书本中", type: "literary" },
                { text: "约上三两好友，去体育馆享受大汗淋漓的快感", type: "sports" },
                { text: "待在宿舍，对着电脑敲积木般的代码或剪视频", type: "tech" },
                { text: "带着相机穿梭在城市的街角，记录光影碎片", type: "art" }
            ]
        },
        {
            id: 2,
            bg: 'var(--c-purple)', // Muted purple
            title: "如果校园生活是一部电影，你认为自己最突出的“超能力”是？",
            options: [
                { text: "极强的同理心与沟通天赋，能读懂人心里的弦外之音", type: "literary" },
                { text: "源源不断的灵感火花，总能把平凡事物变得充满创意", type: "art" },
                { text: "冷静的逻辑大脑，能像庖丁解牛般把复杂难题拆解", type: "tech" },
                { text: "感染他人的充沛活力，只要你在场就绝对不会冷场", type: "sports" }
            ]
        },
        {
            id: 3,
            bg: '#D4907A', // lighter terracotta / dusty rose
            title: "想象你加入了一个初创团队，此时你最倾向于承担什么角色？",
            options: [
                { text: "掌控发展方向的掌舵者，确保一切能够有条不紊、逻辑严密地推进", type: "literary" },
                { text: "天马行空的点子王，负责构思新颖的创意和视觉上的美学产出", type: "art" },
                { text: "稳扎稳打的架构师，默默在背后死磕技术难关，提供坚实的底层资源保障", type: "tech" },
                { text: "凝聚人心的粘合剂，激励陷入疲惫的大家，随时随地活跃团队氛围", type: "sports" }
            ]
        }
    ];

    // Clubs database mapped to the scores
    const clubsData = {
        literary: {
            title: "沉醉思辨的世界：<br>联合演讲与辩论协会",
            dropcap: "在",
            desc: "外人眼中，辩论仿佛是一场无休止的争吵，但我们深知那绝非真相。辩论关乎缜密的逻辑、优雅的魅力以及说服人心的艺术。你的选项中透露着一颗敏锐的大脑与对于深度智力交锋的渴望。",
            descExt: "当你敢于真实地表达自我，这个拥有深厚底蕴的平台将会赋予你更强大的声量。在这里，你将与志同道合的思想者建立深刻的纽带，用言语雕刻真相。",
            quote: "“真理并非属于嗓门最大的人，它偏爱那些经历过无数次千锤百炼的灵魂深处的论据。”",
            img: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=800&auto=format&fit=crop",
            alt1: { title: "蒹葭文学社", desc: "文字的庇护所，以笔诉心声。", icon: "feather" },
            alt2: { title: "模拟联合国", desc: "放眼全球局势，共议风云。", icon: "globe" }
        },
        art: {
            title: "织梦的画卷：<br>独立实验艺术联盟",
            dropcap: "艺",
            desc: "术并不是我们看到了什么，而是我们能让别人在这其中看到什么。你的选择描绘出了一个极致感性且极富创造力的灵魂：你能够在最平凡的日常碎片中捕捉到稍纵即逝的美感。",
            descExt: "从拿起画笔到按下快门，再到布展前夜的忙碌，在这里你不再需要迎合常规的审美。打破它、重塑它，用视觉的语言诉说你心底最瑰丽的梦境。",
            quote: "“在这个充满秩序的世界上，我们是少数几个拥有特权，能够自由创造甚至犯些可爱‘错误’的人。”",
            img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
            alt1: { title: "先锋摄影协会", desc: "用光与影的交织框住时间。", icon: "camera" },
            alt2: { title: "戏剧公社", desc: "在舞台的聚光灯下活出另一种人生。", icon: "masks" }
        },
        tech: {
            title: "敲打出时代的脉搏：<br>GEEK 极客创客营",
            dropcap: "在",
            desc: "这个喧嚣的世界里，有些人在人群的浪潮中寻找答案，而真正的造物主，则在安静的逻辑算法与工程代码中汲取着无尽的慰藉——那是属于解构和重塑的快乐。",
            descExt: "你生来便拥有拆解复杂难题的天赋。当别人抱怨问题不可逾越时，你却能在底层构架中铺设解决方案的基石。欢迎来到技术爱好者的无极圣殿，让我们一起敲代码到天明。",
            quote: "“言语是廉价的；向我展示你的代码！我们用一行行指令与逻辑搭建明日的世界。”",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
            alt1: { title: "AI 与算法公社", desc: "驯服庞大数据的浪漫与严谨。", icon: "cpu" },
            alt2: { title: "航空航天模型社", desc: "我们不仰望星空，我们飞向星空。", icon: "rocket" }
        },
        sports: {
            title: "无休止的狂奔：<br>极限体能与运动联盟",
            dropcap: "能",
            desc: "量不生亦不灭，但它绝对可以被引导与宣泄。毫无疑问，你正是那股蓬勃活力的化身！在这个奉行动感的世界里，你对肾上腺素飙升和打破身体桎梏的渴望，构成了最闪耀的名片。",
            descExt: "没有什么是比在大汗淋漓后喝下一口冰水更让人振奋的了。跳出舒适圈吧，这里有一群同样躁动不安的灵魂，等待着在挑战身体极限的路上与你结伴同行。",
            quote: "“100% 的犹豫，意味着 100% 的错过。抛开顾虑，只需全速奔赴热爱！”",
            img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
            alt1: { title: "夜跑战队夜行者", desc: "晚风和律动的步伐是最好的解药。", icon: "footprints" },
            alt2: { title: "自由搏击社", desc: "不屈服于任何一记重拳的力量。", icon: "swords" }
        }
    };

    let userScores = {
        literary: 0,
        art: 0,
        tech: 0,
        sports: 0
    };

    // Render flow
    function renderQuestions() {
        container.innerHTML = '';
        questions.forEach((q, index) => {
            const pageDiv = document.createElement('div');
            pageDiv.className = 'page question-page';
            pageDiv.id = `page-q${index + 1}`;
            pageDiv.style.backgroundColor = q.bg;

            let optionsHtml = q.options.map(opt => `
                <button class="option-btn" style="font-family: 'Noto Serif SC', serif; font-weight: 600;" data-type="${opt.type}" data-next="${index + 1}">
                    ${opt.text}
                </button>
            `).join('');

            pageDiv.innerHTML = `
                <div class="magazine-header">
                    <span class="issue-number">第 ${index + 1} 章</span>
                    <span class="magazine-title-small">自我探索的旅途</span>
                    <span class="index-link" onclick="location.reload()"><i data-lucide="x" class="icon-sm"></i> 退出重来</span>
                </div>
                <div class="question-content">
                    <div class="q-number">Q${index + 1}.</div>
                    <h2 class="q-text" style="font-family: 'Noto Serif SC', serif; font-weight: 700;">${q.title}</h2>
                    <div class="options-grid">
                        ${optionsHtml}
                    </div>
                </div>
            `;
            container.appendChild(pageDiv);
        });
        lucide.createIcons();
        bindOptionEvents();
    }

    function switchPage(fromId, toId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        // slight delay to ensure render
        setTimeout(() => {
            const toPage = document.getElementById(toId);
            if(toPage) toPage.classList.add('active');
        }, 50);
    }

    function bindOptionEvents() {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.currentTarget.getAttribute('data-type');
                const nextIdx = parseInt(e.currentTarget.getAttribute('data-next'));
                
                // Add score
                userScores[type]++;

                if (nextIdx < questions.length) {
                    // Go to next question
                    switchPage(`page-q${nextIdx}`, `page-q${nextIdx + 1}`);
                } else {
                    // Go to result
                    showResult();
                }
            });
        });
    }

    function showResult() {
        // Find highest score dimension
        let topType = Object.keys(userScores).reduce((a, b) => userScores[a] > userScores[b] ? a : b);
        const match = clubsData[topType];

        // Populate dynamic localized results
        document.getElementById('match-title').innerHTML = match.title;
        document.getElementById('match-dropcap').textContent = match.dropcap;
        document.getElementById('match-desc').innerHTML = match.desc;
        document.getElementById('match-desc-extended').innerHTML = match.descExt;
        
        document.getElementById('match-quote').textContent = match.quote;
        document.getElementById('match-img').src = match.img;

        // Dynamic Alt Suggestions
        const altCard1 = document.getElementById('alt-club-1');
        const altCard2 = document.getElementById('alt-club-2');
        
        altCard1.innerHTML = `
            <i data-lucide="${match.alt1.icon}"></i>
            <div>
                <h4 style="font-family: 'Noto Serif SC', serif; font-weight: 700;">${match.alt1.title}</h4>
                <span>${match.alt1.desc}</span>
            </div>
            <i data-lucide="chevron-right" class="alt-arrow"></i>
        `;
        altCard1.style.cursor = 'pointer';
        altCard1.dataset.clubName = match.alt1.title;

        altCard2.innerHTML = `
            <i data-lucide="${match.alt2.icon}"></i>
            <div>
                <h4 style="font-family: 'Noto Serif SC', serif; font-weight: 700;">${match.alt2.title}</h4>
                <span>${match.alt2.desc}</span>
            </div>
            <i data-lucide="chevron-right" class="alt-arrow"></i>
        `;
        altCard2.style.cursor = 'pointer';
        altCard2.dataset.clubName = match.alt2.title;

        // Wire click handlers — look up club and open detail panel
        [altCard1, altCard2].forEach(card => {
            // Remove old listeners by cloning
            const fresh = card.cloneNode(true);
            card.parentNode.replaceChild(fresh, card);
            fresh.style.cursor = 'pointer';
            fresh.addEventListener('click', () => {
                const name = fresh.dataset.clubName;
                const club = allClubsArray.find(c => c.name === name);
                if (club) {
                    renderDirectory();
                    dirOverlay.classList.add('show');
                    openClubDetail(club);
                }
            });
        });

        switchPage(`page-q${questions.length}`, 'page-result');
        lucide.createIcons();
    }

    // Initialize the questionnaire pages
    renderQuestions();

    // Event Listeners for cover to first page
    document.getElementById('start-btn').addEventListener('click', () => {
        switchPage('page-cover', 'page-q1');
    });

    // Event Listeners to retake test
    document.getElementById('restart-btn').addEventListener('click', () => {
        userScores = { literary: 0, art: 0, tech: 0, sports: 0 };
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        pages.cover.classList.add('active');
    });

    // === Apply / Login Modal Logic ===
    const applyModal  = document.getElementById('apply-modal');
    const applyForm   = document.getElementById('apply-form');
    const formView    = document.getElementById('modal-form-view');
    const successView = document.getElementById('modal-success-view');
    const modalIssueLabel  = document.querySelector('#apply-modal .modal-issue');
    const modalSubmitBtn   = applyForm.querySelector('button[type="submit"]');
    const modalSubtitle    = document.querySelector('#modal-form-view .modal-subtitle');

    let modalMode = 'apply'; // 'login' | 'apply'

    function openModal(mode = 'apply') {
        modalMode = mode;
        formView.style.display = 'block';
        successView.style.display = 'none';
        applyForm.reset();

        if (mode === 'login') {
            modalIssueLabel.style.visibility = 'hidden';   // hide "申请加入" label
            modalSubtitle.textContent = '完成学籍认证后，即可开始专属社团匹配测试。';
            modalSubmitBtn.innerHTML = '开始探索 <i data-lucide="arrow-right"></i>';
        } else {
            modalIssueLabel.style.visibility = 'visible';
            modalSubtitle.textContent = '请填写以下信息完成身份验证，我们将第一时间通知社团负责人与你联系。';
            modalSubmitBtn.innerHTML = '提交申请 <i data-lucide="send"></i>';
        }

        applyModal.classList.add('show');
        lucide.createIcons();
    }

    function closeModal() {
        applyModal.classList.remove('show');
    }

    // Login button on cover page
    document.getElementById('login-btn').addEventListener('click', () => openModal('login'));

    // Apply button on result page
    document.querySelector('.result-text-column .solid-btn').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('apply');
    });

    // Close on X button
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);

    // Close when clicking outside the modal box
    applyModal.addEventListener('click', (e) => {
        if (e.target === applyModal) closeModal();
    });

    // Form submission — behaviour depends on mode
    applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (modalMode === 'login') {
            // Close modal and start the quiz
            closeModal();
            setTimeout(() => switchPage('page-cover', 'page-q1'), 300);
        } else {
            // Apply mode: show success screen
            formView.style.display = 'none';
            successView.style.display = 'block';
            lucide.createIcons();
        }
    });

    // Done button closes modal
    document.getElementById('modal-done-btn').addEventListener('click', closeModal);

    // === Directory & Sidepanel Logic ===
    const allClubsArray = [
        { id: 'c1', name: "联合演讲与辩论协会", category: "文学与思辨", desc: "辩论关乎缜密的逻辑、优雅的魅力以及说服人心的艺术。在这里，你将与志同道合的思想者建立深刻的纽带，用言语雕刻真相。", members: "85人", founded: "2010", location: "人文楼 304", icon: "message-square", tags: ["辩论", "演讲", "逻辑"], img: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=800&auto=format&fit=crop" },
        { id: 'c2', name: "独立实验艺术联盟", category: "创意与艺术", desc: "从拿起画笔到按下快门，再到布展前夜的忙碌，在这里你不再需要迎合常规的审美。打破它、重塑它，用视觉语言诉说你心底最瑰丽的梦境。", members: "120人", founded: "2015", location: "艺术中心地下排练室", icon: "palette", tags: ["绘画", "策展", "实验艺术"], img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop" },
        { id: 'c3', name: "GEEK 极客创客营", category: "科技与工程", desc: "真正的造物主，在安静的逻辑算法与工程代码中汲取着无尽的慰藉——那是属于解构和重塑的快乐。我们用一行行指令与逻辑搭建明日的世界。", members: "200人", founded: "2008", location: "知行楼 501 创客空间", icon: "terminal", tags: ["编程", "硬件", "黑客马拉松"], img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop" },
        { id: 'c4', name: "极限体能与运动联盟", category: "体育与竞技", desc: "没有什么是比在大汗淋漓后喝下一口冰水更让人振奋的了。跳出舒适圈吧，我们等待着在挑战身体极限的路上与你结伴同行。", members: "150人", founded: "2012", location: "南区体育场看台下", icon: "activity", tags: ["体能跨栏", "冲浪跑", "极限挑战"], img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop" },
        { id: 'c5', name: "蒹葭文学社", category: "文学与思辨", desc: "文字的庇护所，以笔诉心声。致力于古典诗词、现代诗歌、散文的创作与赏析互鉴。", members: "60人", founded: "1998", location: "图书馆 4 楼研讨室", icon: "feather", tags: ["现代诗", "散文", "读书分享会"], img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop" },
        { id: 'c6', name: "先锋摄影协会", category: "创意与艺术", desc: "用光与影的交织框住时间。校园乃至城市角落最敏锐的记录者与时代观察者。", members: "110人", founded: "2005", location: "学生活动中心 202 暗房", icon: "camera", tags: ["胶片暗房", "城市扫街", "人像外拍"], img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop" },
        { id: 'c7', name: "AI 与算法公社", category: "科技与工程", desc: "驯服庞大数据的浪漫与严谨。专注于机器学习、神经网络等前沿科技的校园原生探索阵地。", members: "90人", founded: "2018", location: "计算中心三楼开源实验室", icon: "cpu", tags: ["深度学习", "数据分析", "AI 图像生成"], img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop" },
        { id: 'c8', name: "夜跑战队夜行者", category: "体育与竞技", desc: "晚风和律动的步伐是最好的解药。不论配速高低，只为通过奔跑迈出属于自己的节奏，甩掉一天的疲惫。", members: "300人", founded: "2016", location: "主操场南入口集结点", icon: "footprints", tags: ["荧光夜跑", "城市马拉松", "健康减脂"], img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop" },
        { id: 'c9',  name: "模拟联合国", category: "文学与思辨", desc: "放眼全球局势，共议风云变幻。在仿真的外交场域中锻炼国际视野、谈判技巧与多边协作能力，是未来全球公民的必经之路。", members: "75人", founded: "2011", location: "国际交流楼 B201", icon: "globe", tags: ["外交模拟", "国际时事", "演讲辩论"], img: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop" },
        { id: 'c10', name: "戏剧公社", category: "创意与艺术", desc: "在舞台聚光灯下活出另一种人生。从剧本创作到舞台表演，感受戏剧最真实的情绪共鸣与创作力量。", members: "80人", founded: "2007", location: "大学生活动中心黑匣子剧场", icon: "drama", tags: ["话剧演出", "即兴戏剧", "剧本创作"], img: "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=800&auto=format&fit=crop" },
        { id: 'c11', name: "航空航天模型社", category: "科技与工程", desc: "我们不仰望星空，我们飞向星空。用双手组装无人机与火箭模型，把工程梦想变成飞行现实。", members: "55人", founded: "2013", location: "工程楼 A 区实验场", icon: "rocket", tags: ["无人机竞速", "火箭模型", "航空控制"], img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=800&auto=format&fit=crop" },
        { id: 'c12', name: "自由搏击社", category: "体育与竞技", desc: "不屈服于任何一记重拳的力量。训练自律、爆发与韧性，在这里你会发现力量不只来自肌肉，更来自意志。", members: "65人", founded: "2014", location: "体育馆格斗训练室", icon: "swords", tags: ["拳击基础", "综合格斗", "体能训练"], img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop" }
    ];

    const dirOverlay = document.getElementById('dir-overlay');
    const dirGrid = document.getElementById('dir-grid');
    const clubDetailPanel = document.getElementById('club-detail-panel');

    function renderDirectory() {
        dirGrid.innerHTML = '';
        allClubsArray.forEach(club => {
            const card = document.createElement('div');
            card.className = 'club-card';
            card.innerHTML = `
                <div class="club-card-icon"><i data-lucide="${club.icon}"></i></div>
                <div class="club-card-cat">${club.category}</div>
                <div class="club-card-name">${club.name}</div>
                <div class="club-card-desc">${club.desc.substring(0, 36)}...</div>
                <i data-lucide="chevron-right" class="club-card-arrow"></i>
            `;
            card.addEventListener('click', () => openClubDetail(club));
            dirGrid.appendChild(card);
        });
        lucide.createIcons();
    }

    function openClubDetail(club) {
        document.getElementById('detail-img').src = club.img;
        document.getElementById('detail-category').textContent = club.category;
        document.getElementById('detail-name').textContent = club.name;
        document.getElementById('detail-desc').textContent = club.desc;
        document.getElementById('detail-members').textContent = club.members;
        document.getElementById('detail-founded').textContent = `成立于 ${club.founded} 年`;
        document.getElementById('detail-location').textContent = club.location;
        document.getElementById('detail-tags').innerHTML = club.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
        
        clubDetailPanel.classList.add('visible');
    }

    // Open Directory from Header '目录' btn
    const dirBtn = document.getElementById('index-dir-btn');
    if(dirBtn) {
        dirBtn.addEventListener('click', () => {
            renderDirectory();
            dirOverlay.classList.add('show');
        });
    }

    document.getElementById('dir-close-btn').addEventListener('click', () => {
        dirOverlay.classList.remove('show');
        setTimeout(() => clubDetailPanel.classList.remove('visible'), 400);
    });

    document.getElementById('detail-back-btn').addEventListener('click', () => {
        // Close overlay entirely and return to the result page
        dirOverlay.classList.remove('show');
        setTimeout(() => clubDetailPanel.classList.remove('visible'), 400);
    });

    // Directly click Apply from detail view
    document.getElementById('detail-apply-btn').addEventListener('click', () => {
        dirOverlay.classList.remove('show');
        clubDetailPanel.classList.remove('visible');
        setTimeout(() => { openModal(); }, 300);
    });

});
