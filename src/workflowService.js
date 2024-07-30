import { sp } from "@pnp/sp";
import { config } from "./enviroiment.js"
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items";
import "@pnp/sp/profiles";
import "@pnp/sp/site-users/web";
import "@pnp/sp/fields";
import "@pnp/sp/site-groups";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/files/folder";


class WorkflowStore {
  constructor() {
    if (!WorkflowStore.instance) {
      sp.setup({ pageContext: { web: { absoluteUrl: config.url.API_URL } } });

      WorkflowStore.instance = this;
    }

    return WorkflowStore.instance;
  }

  async addItemToList(listName, item){
  let itemsAdd = { success: "", errors: ""};
    await sp.web.lists.getByTitle(listName).items.add(item)
    .then(() => {
      itemsAdd.success = "success";
    })
    .catch((error) => {
      console.log(error);
      itemsAdd.errors = error;
    });
    return itemsAdd;
 
  }

  async getItemToList(listName) {
      const items = await sp.web.lists.getByTitle(listName).items.getAll();
      return items;
  }

  async updateItemToList(listName, id, item){
    let itemsUpdate = { success: "", errors: ""};
    await sp.web.lists.getByTitle(listName).items.getById(id).update(item)
    .then(() => {
      itemsUpdate.success = "success";
    })
    .catch((error) => {
      console.log(error);
      itemsUpdate.errors = error;
    });

    return itemsUpdate;
  }

  async deleteItemToList(listName, id){
    let itemsDelete = { success: "", errors: "" };
    await sp.web.lists.getByTitle(listName).items.getById(id).delete()
      .then(() => {
        itemsDelete.success = "success";
      })
      .catch((error) => {
        console.log(error);
        itemsDelete.errors = error;
      });
    return itemsDelete;
  }


}

const workflowService = new WorkflowStore();
Object.freeze(workflowService);

export default workflowService;