<template>
    <div>
        <md-toolbar class="md-transparent md-dense">
            <md-button class="md-icon-button">
                <md-icon>menu</md-icon>
            </md-button>
    
            <h2 class="md-title"
                style="flex: 1">kafka-toolbox</h2>
    
            <md-button class="md-icon-button"
                       @click.native="openDialog('connect')">
                <md-icon>developer_board</md-icon>
            </md-button>
        </md-toolbar>
    
        <md-dialog ref="connect">
            <md-dialog-title>Create new note</md-dialog-title>
    
            <md-dialog-content>
                <form>
                    <div v-show="isConnected===true"
                         :dismissible="false"
                         :type="status">
                        {{data.message}}
                    </div>
                    <md-input-container>
                        <label>Zookeeper host:port</label>
                        <md-input v-model="url"></md-input>
                    </md-input-container>
                </form>
            </md-dialog-content>
    
            <md-dialog-actions>
                <md-button class="md-primary"
                           @click.native="test">Test</md-button>
                <md-button class="md-primary"
                           @click.native="closeDialog('connect')">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>
<script>
import {
    ipcRenderer
} from 'electron'
export default {
    data() {
        return {
            isConnected: undefined,
            connections: "",
            status: undefined,
            url: 'localhost:2181',
            data: { messaage: "", success: false }
        }

    },
    methods: {
        openDialog(ref) {
            this.$refs[ref].open();
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        test() {
            let op = ipcRenderer.sendSync('test', this.url);
            this.isConnected = op.success;
            this.status = this.isConnected === true ? 'success' : 'error'
            this.data = op;
            console.log(op)
            this.connections = `${op.data[0][0].host}:${op.data[0][0].port}`

            this.$emit('status', op);

        }
    },
    //  components: {
    //         UiButton,
    //         UiModal,
    //         UiTab,
    //         UiTabs
    //     },
    name: 'nav-bar'
}

</script>