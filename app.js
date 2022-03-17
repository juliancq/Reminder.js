const app = new Vue({

    el: "#app",
    data() {
        return {
            username: "John Doe",
            pfp: "👨‍🦳",
            userId: 0,
            categories: [],
            selected: -1,
            nightmode: true
        }
    },
    methods: {

        selectCategory(index) {

            this.categories[index].editable = false;
            this.selected = index;
        },

        addCategory(title = "Random title") {

            this.categories.push({
                title,
                color: null,
                items: [],
                editable: false
            })
        },

        setEditable(index) {
            this.categories[index].title = "";
            this.categories[index].editable = true;
        },

        configCategory() {

            alert("...");
        },

        deleteCategory() {

            if (confirm("Are u Sure?")){
                this.categories.splice(this.selected, 1)
                this.selected = -1;
            }

        },


        addItem() {

            this.categories[this.selected].items.push({
                title: "New item",
                done: false
            })
            this.$forceUpdate();
            
            setTimeout(()=>{
                this.$refs.last[0].focus()
            }, 0)      
        },

        deleteItem(index) {


            this.categories[this.selected].items.splice(index, 1)
            this.$forceUpdate();
        },

        toggleNightMode() {

            this.nightmode = !this.nightmode
        },


        loadUser(userId) {

            let data = this.GETData(userId)

            if (Object.keys(data).length == 0) return 
            
            this.categories = data.categories
            this.username = data.username;
            this.pfp = data.pfp;
        },

        saveUser(userId) {

            this.POSTData(userId, {
                categories: this.categories,
                username: this.username,
                pfp: this.pfp
            })

            alert("Saved :)")
        },

        POSTData(userId, data) {

            localStorage.setItem(userId, JSON.stringify(data));
        },

        GETData(userId) {

            return JSON.parse(localStorage.getItem(userId) || "{}")
        }
    },
    created() {

        this.loadUser(this.userId);
    }
    
})