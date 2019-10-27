import Vue from "vue";

const skill = {
    template: "#skill",
    props: ["skillName", "skillPercent"],
    methods: {
        drawColoredCircle() {
            const circle = this.$refs["color-circle"];
            const dashArray = parseInt (
                getComputedStyle(circle).getPropertyValue('stroke-dasharray')
                );
                const percent = (dashArray / 100) * (100 - this.skillPercent);
                circle.style.strokeDashoffset = percent;
        }
    },
    mounted() {
      this.drawColoredCircle();  
       
    }
};

const skillsRow = {
    template: "#skills-row",
    components: { skill},
    props: ["skill"]
};

new Vue ({
    el: "#skills-component",
    template: "#skills-list",
    data: () => ({
        skills: 
        [
            {
                "skillsGroup" : "Frontend",
                "skills": {
                    "html5": 30,
                    "css3": 50,
                    "JavaScript": 30,
                    "Jquery и Vue.js": 20,
                }

            },
            {
                "skillsGroup": "Backend",
                "skills" : {
                    "Git" : 30,
                    "Terminal": 60,
                    "Gulp": 30,
                    "Webpack": 20,
                }
            }

        ]
    }),
    components: {skillsRow},
    created () {
        //this.skills = data;
    }
});

